import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.security import get_current_admin
from app.database import get_db
from app.models.event import Event
from app.models.registration import EventRegistration, RegistrationMember, AuditLog
from app.models.user import User
from app.schemas.registration import (
    RegistrationDetailResponse,
    RegistrationMemberDetail,
    TicketScanRequest,
    TicketScanResponse,
)

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/registrations/pending", response_model=List[RegistrationDetailResponse])
def get_pending_registrations(
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Returns list of registrations awaiting admin approval (status='pending_approval' or all registrations).
    """
    registrations = (
        db.query(EventRegistration)
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


@router.post("/registrations/{registration_id}/approve", response_model=RegistrationDetailResponse)
def approve_registration(
    registration_id: uuid.UUID,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Admin approves registration:
    1. Sets status to 'approved', verified_by and verified_at.
    2. Generates uuid4 ticket_qr_token for all members.
    3. Logs to audit_logs in an atomic transaction.
    """
    try:
        registration = (
            db.query(EventRegistration)
            .filter(EventRegistration.id == registration_id)
            .with_for_update()
            .first()
        )

        if not registration:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Registration not found",
            )

        registration.status = "approved"
        registration.verified_by = current_admin.id
        registration.verified_at = datetime.now(timezone.utc)

        # Generate ticket_qr_tokens for all members in this registration
        members = (
            db.query(RegistrationMember)
            .filter(RegistrationMember.registration_id == registration.id)
            .with_for_update()
            .all()
        )

        for member in members:
            if member.ticket_qr_token is None:
                member.ticket_qr_token = uuid.uuid4()

        # Audit log
        audit = AuditLog(
            admin_id=current_admin.id,
            action="APPROVE_REGISTRATION",
            target_type="event_registration",
            target_id=str(registration.id),
            details={
                "event_id": str(registration.event_id),
                "leader_id": str(registration.leader_id),
                "team_name": registration.team_name,
                "amount_paid": str(registration.amount_paid),
                "members_count": len(members),
            },
        )
        db.add(audit)

        db.commit()
        db.refresh(registration)

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
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to approve registration: {str(e)}",
        )


@router.post("/registrations/{registration_id}/reject", response_model=RegistrationDetailResponse)
def reject_registration(
    registration_id: uuid.UUID,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Admin rejects registration:
    1. Sets status to 'rejected'.
    2. Increments retry_count.
    3. Logs to audit_logs.
    """
    try:
        registration = (
            db.query(EventRegistration)
            .filter(EventRegistration.id == registration_id)
            .with_for_update()
            .first()
        )

        if not registration:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Registration not found",
            )

        registration.status = "rejected"
        registration.retry_count = registration.retry_count + 1
        registration.verified_by = current_admin.id
        registration.verified_at = datetime.now(timezone.utc)

        # Audit log
        audit = AuditLog(
            admin_id=current_admin.id,
            action="REJECT_REGISTRATION",
            target_type="event_registration",
            target_id=str(registration.id),
            details={
                "event_id": str(registration.event_id),
                "leader_id": str(registration.leader_id),
                "retry_count": registration.retry_count,
            },
        )
        db.add(audit)

        db.commit()
        db.refresh(registration)

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
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to reject registration: {str(e)}",
        )


@router.post("/tickets/scan", response_model=TicketScanResponse)
def scan_ticket(
    payload: TicketScanRequest,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Validates and consumes event ticket QR token at entry gate:
    1. Uses .with_for_update() row lock on registration_members table for strict concurrency.
    2. Checks token validity and ticket_used status.
    3. Sets ticket_used = True, scanned_at = now().
    4. Logs to audit_logs and returns student & team details.
    """
    try:
        # 1. Concurrency Lock: with_for_update()
        member = (
            db.query(RegistrationMember)
            .filter(RegistrationMember.ticket_qr_token == payload.ticket_qr_token)
            .with_for_update()
            .first()
        )

        if not member:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Invalid or non-existent ticket QR code",
            )

        # 2. Check if ticket already used
        if member.ticket_used:
            formatted_scanned_at = (
                member.scanned_at.strftime("%Y-%m-%d %H:%M:%S UTC")
                if member.scanned_at
                else "earlier"
            )
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Ticket already used at {formatted_scanned_at}",
            )

        # 3. Mark ticket as used
        now_time = datetime.now(timezone.utc)
        member.ticket_used = True
        member.scanned_at = now_time

        # 4. Audit log
        audit = AuditLog(
            admin_id=current_admin.id,
            action="SCAN_TICKET",
            target_type="registration_member",
            target_id=str(member.id),
            details={
                "ticket_qr_token": str(member.ticket_qr_token),
                "student_id": str(member.student_id),
                "event_id": str(member.event_id),
                "scanned_at": now_time.isoformat(),
            },
        )
        db.add(audit)

        db.commit()
        db.refresh(member)

        student_name = member.student.name if member.student else "Student"
        student_stdid = member.student.stdid if (member.student and member.student.stdid) else str(member.student_id)
        team_name = (
            member.registration.team_name
            if (member.registration and member.registration.team_name)
            else "Individual"
        )

        return TicketScanResponse(
            message="Ticket verified and scanned successfully",
            member_name=student_name,
            student_id=student_stdid,
            team_name=team_name,
            scanned_at=now_time,
        )
    except HTTPException:
        db.rollback()
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Scan transaction failed: {str(e)}",
        )
