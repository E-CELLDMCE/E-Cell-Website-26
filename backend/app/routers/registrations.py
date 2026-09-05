import uuid
from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.core.security import get_current_user, require_registration_access
from app.database import get_db
from app.models.event import Event
from app.models.registration import EventRegistration, RegistrationMember
from app.models.user import User
from app.schemas.registration import (
    MemberTicketResponse,
    RegistrationDetailResponse,
    RegistrationMemberDetail,
    RegistrationSimpleResponse,
    TeamRegistrationCreate,
)
from app.schemas.user import StudentLookupResponse
from app.services.cloudinary_service import upload_payment_screenshot
from app.services.registration_service import generate_tickets_for_registration
from app.utils.qr_generator import generate_qr_base64

router = APIRouter(prefix="/registrations", tags=["Registrations"])


@router.get("/student-lookup/{stdid}", response_model=StudentLookupResponse)
def lookup_student_by_stdid(
    stdid: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Look up a student teammate by stdid.
    Returns 404 if not found or role != 'student'.
    """
    clean_stdid = stdid.strip()
    student = (
        db.query(User)
        .filter(User.stdid == clean_stdid, User.role == "student")
        .first()
    )
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Teammate profile not found with stdid '{clean_stdid}'",
        )
    return StudentLookupResponse(
        id=student.id,
        stdid=student.stdid,
        name=student.name,
        email=student.email,
    )


@router.post("/", response_model=RegistrationSimpleResponse, status_code=status.HTTP_201_CREATED)
def register_team(
    payload: TeamRegistrationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Register leader and optional teammates for an event.
    Performs team size validation, teammate resolution, duplicate check, and atomic insertion.
    """
    # 0. Ensure leader has completed profile with stdid
    if not current_user.stdid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You must complete your profile (set your Student ID) before registering for events",
        )

    # 1. Fetch Event with row lock for concurrency protection
    event = (
        db.query(Event)
        .filter(Event.id == payload.event_id)
        .with_for_update()
        .first()
    )
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )

    # Server-side Registration Deadline check
    if event.registration_deadline:
        deadline = event.registration_deadline
        if deadline.tzinfo is None:
            deadline = deadline.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) > deadline:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration deadline has passed for this event",
            )

    # Server-side Capacity check (concurrency protected by with_for_update lock)
    if event.max_capacity is not None:
        current_reg_count = (
            db.query(EventRegistration)
            .filter(
                EventRegistration.event_id == event.id,
                EventRegistration.status != "rejected",
            )
            .count()
        )
        if current_reg_count >= event.max_capacity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Event full: maximum capacity reached",
            )

    # 2. Team Size & Solo Event Validations
    clean_member_stdids = [sid.strip() for sid in payload.member_stdids if sid.strip()]

    # Leader cannot include themselves in member_stdids
    if current_user.stdid in clean_member_stdids:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Leader Student ID cannot be included in teammate list",
        )

    # Check for duplicate stdids in input
    if len(clean_member_stdids) != len(set(clean_member_stdids)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Duplicate student IDs found in teammate list",
        )

    total_members = 1 + len(clean_member_stdids)

    if not event.is_team_event and len(clean_member_stdids) > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This is an individual event. Teammates cannot be added.",
        )

    if total_members < event.min_team_size or total_members > event.max_team_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid team size {total_members}. Required team size is between {event.min_team_size} and {event.max_team_size}.",
        )

    # 3. Resolve all member stdids
    teammates: List[User] = []
    for sid in clean_member_stdids:
        teammate = (
            db.query(User)
            .filter(User.stdid == sid, User.role == "student")
            .first()
        )
        if not teammate:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Teammate profile not found with stdid '{sid}'",
            )
        teammates.append(teammate)

    # 4. Check if Leader or any Teammate is already registered for this event
    all_participant_users = [current_user] + teammates
    all_participant_ids = [u.id for u in all_participant_users]

    existing_memberships = (
        db.query(RegistrationMember)
        .filter(
            RegistrationMember.event_id == event.id,
            RegistrationMember.student_id.in_(all_participant_ids),
        )
        .all()
    )
    if existing_memberships:
        conflict_student_id = existing_memberships[0].student_id
        conflict_user = next((u for u in all_participant_users if u.id == conflict_student_id), None)
        conflict_stdid = conflict_user.stdid if conflict_user else str(conflict_student_id)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Student '{conflict_stdid}' is already registered for this event",
        )

    # 5. Atomic Transaction: Create EventRegistration and RegistrationMember rows
    try:
        # Free events (fee_amount == 0) skip the payment step entirely:
        # set status to 'approved' immediately and generate tickets so the
        # registration never gets stuck in the payment-approval queue.
        is_free_event = event.fee_amount is None or float(event.fee_amount) == 0
        initial_status = "approved" if is_free_event else "pending_payment"

        registration = EventRegistration(
            event_id=event.id,
            leader_id=current_user.id,
            team_name=payload.team_name.strip() if payload.team_name else None,
            status=initial_status,
            amount_paid=event.fee_amount,
        )
        db.add(registration)
        db.flush()  # Populates registration.id

        # Insert Leader as RegistrationMember
        leader_member = RegistrationMember(
            registration_id=registration.id,
            event_id=event.id,
            student_id=current_user.id,
            is_leader=True,
        )
        db.add(leader_member)

        # Insert Teammates
        for teammate in teammates:
            member = RegistrationMember(
                registration_id=registration.id,
                event_id=event.id,
                student_id=teammate.id,
                is_leader=False,
            )
            db.add(member)

        db.flush()  # Populate member ids before generating tickets

        if is_free_event:
            # Auto-approve free events: stamp verified_at + tickets so the
            # registration behaves identically to an admin-approved one.
            # Reuse the exact same ticket-generation helper the admin
            # approval endpoint uses, so there is one source of truth.
            registration.verified_at = datetime.now(timezone.utc)
            generate_tickets_for_registration(db, registration)

        db.commit()
        db.refresh(registration)

        return RegistrationSimpleResponse(
            id=registration.id,
            event_id=registration.event_id,
            team_name=registration.team_name,
            status=registration.status,
            amount_paid=registration.amount_paid,
            message=(
                "Registration confirmed. Tickets generated."
                if is_free_event
                else "Registration initiated. Please proceed to payment submission."
            ),
        )
    except IntegrityError as ie:
        db.rollback()
        err_str = str(ie).lower()
        if "registration_members" in err_str or "event_student" in err_str:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Student already registered for this event in another team",
            )
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Already registered for this event",
        )
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create registration: {str(e)}",
        )


@router.get("/my-tickets", response_model=List[MemberTicketResponse])
def get_my_tickets(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Returns approved tickets for current student with base64 encoded QR codes.
    """
    memberships = (
        db.query(RegistrationMember)
        .join(EventRegistration, RegistrationMember.registration_id == EventRegistration.id)
        .join(Event, RegistrationMember.event_id == Event.id)
        .filter(
            RegistrationMember.student_id == current_user.id,
            EventRegistration.status == "approved",
            RegistrationMember.ticket_qr_token.isnot(None),
        )
        .all()
    )

    tickets: List[MemberTicketResponse] = []
    for m in memberships:
        token_str = str(m.ticket_qr_token)
        qr_b64 = generate_qr_base64(token_str)
        tickets.append(
            MemberTicketResponse(
                ticket_qr_token=m.ticket_qr_token,
                event_title=m.event.title if m.event else "E-Cell Event",
                event_date=m.event.event_date if m.event else None,
                team_name=m.registration.team_name if m.registration else None,
                ticket_used=m.ticket_used,
                scanned_at=m.scanned_at,
                qr_code_base64=qr_b64,
            )
        )

    return tickets


@router.get("/my-registrations", response_model=List[RegistrationDetailResponse])
def get_my_registrations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Returns registrations led by or including the current user."""
    # Find registration IDs where user is member or leader
    member_reg_ids = (
        db.query(RegistrationMember.registration_id)
        .filter(RegistrationMember.student_id == current_user.id)
        .subquery()
    )

    registrations = (
        db.query(EventRegistration)
        .filter(
            (EventRegistration.leader_id == current_user.id)
            | (EventRegistration.id.in_(member_reg_ids))
        )
        .order_by(EventRegistration.created_at.desc())
        .all()
    )

    result: List[RegistrationDetailResponse] = []
    for reg in registrations:
        members_detail = []
        for m in reg.members:
            members_detail.append(
                RegistrationMemberDetail(
                    id=m.id,
                    student_id=m.student_id,
                    student_name=m.student.name if m.student else "",
                    student_email=m.student.email if m.student else "",
                    student_stdid=m.student.stdid if m.student else None,
                    is_leader=m.is_leader,
                    ticket_qr_token=m.ticket_qr_token,
                    ticket_used=m.ticket_used,
                    scanned_at=m.scanned_at,
                )
            )
        result.append(
            RegistrationDetailResponse(
                id=reg.id,
                event_id=reg.event_id,
                event_title=reg.event.title if reg.event else None,
                leader_id=reg.leader_id,
                leader_name=reg.leader.name if reg.leader else None,
                leader_email=reg.leader.email if reg.leader else None,
                leader_stdid=reg.leader.stdid if reg.leader else None,
                team_name=reg.team_name,
                status=reg.status,
                transaction_id=reg.transaction_id,
                payment_screenshot_url=reg.payment_screenshot_url,
                amount_paid=reg.amount_paid,
                retry_count=reg.retry_count,
                created_at=reg.created_at,
                verified_at=reg.verified_at,
                members=members_detail,
            )
        )
    return result


@router.get("/{registration_id}", response_model=RegistrationDetailResponse)
def get_registration(
    registration: EventRegistration = Depends(require_registration_access),
):
    """
    Returns registration details and team roster.
    Accessible to team leader, team members, and admins.
    """
    members_detail = [
        RegistrationMemberDetail(
            id=m.id,
            student_id=m.student_id,
            student_name=m.student.name if m.student else "",
            student_email=m.student.email if m.student else "",
            student_stdid=m.student.stdid if m.student else None,
            is_leader=m.is_leader,
            ticket_qr_token=m.ticket_qr_token,
            ticket_used=m.ticket_used,
            scanned_at=m.scanned_at,
        )
        for m in registration.members
    ]
    return RegistrationDetailResponse(
        id=registration.id,
        event_id=registration.event_id,
        event_title=registration.event.title if registration.event else None,
        leader_id=registration.leader_id,
        leader_name=registration.leader.name if registration.leader else None,
        leader_email=registration.leader.email if registration.leader else None,
        leader_stdid=registration.leader.stdid if registration.leader else None,
        team_name=registration.team_name,
        status=registration.status,
        transaction_id=registration.transaction_id,
        payment_screenshot_url=registration.payment_screenshot_url,
        amount_paid=registration.amount_paid,
        retry_count=registration.retry_count,
        created_at=registration.created_at,
        verified_at=registration.verified_at,
        members=members_detail,
    )


@router.post("/{registration_id}/payment", response_model=RegistrationSimpleResponse)
async def submit_payment(
    registration_id: uuid.UUID,
    transaction_id: str = Form(..., description="Transaction ID / UTR reference"),
    file: UploadFile = File(..., description="Payment screenshot image"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Uploads payment screenshot to Cloudinary and updates registration status to pending_approval.
    Validates deadline and team size before accepting payment.
    """
    registration = (
        db.query(EventRegistration)
        .filter(EventRegistration.id == registration_id)
        .first()
    )
    if not registration:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Registration not found",
        )

    if registration.leader_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the team leader can submit payment for this registration",
        )

    event = registration.event or db.query(Event).filter(Event.id == registration.event_id).first()

    # Defensive guard: free events must never accept a payment submission.
    # Registration for a free event is auto-approved at creation time, so
    # reaching this endpoint for one indicates a client bug; reject cleanly.
    if event is not None and (event.fee_amount is None or float(event.fee_amount) == 0):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This event is free; no payment is required.",
        )

    # Re-check Registration Deadline server-side
    if event and event.registration_deadline:
        deadline = event.registration_deadline
        if deadline.tzinfo is None:
            deadline = deadline.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) > deadline:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration deadline has passed for this event",
            )

    # Re-check Team Size before payment submission
    if event:
        member_count = (
            db.query(RegistrationMember)
            .filter(RegistrationMember.registration_id == registration.id)
            .count()
        )
        if member_count < event.min_team_size or member_count > event.max_team_size:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid team size ({member_count}). Required team size is between {event.min_team_size} and {event.max_team_size}.",
            )

    # Upload to Cloudinary
    screenshot_url = await upload_payment_screenshot(file)

    try:
        registration.transaction_id = transaction_id.strip()
        registration.payment_screenshot_url = screenshot_url
        registration.status = "pending_approval"
        db.commit()
        db.refresh(registration)

        return RegistrationSimpleResponse(
            id=registration.id,
            event_id=registration.event_id,
            team_name=registration.team_name,
            status=registration.status,
            amount_paid=registration.amount_paid,
            message="Payment screenshot uploaded successfully. Awaiting admin approval.",
        )
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update payment status: {str(e)}",
        )
