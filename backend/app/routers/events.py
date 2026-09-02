import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user, get_current_admin
from app.database import get_db
from app.models.event import Event
from app.models.user import User
from app.schemas.event import EventCreate, EventUpdate, EventResponse

router = APIRouter(prefix="/events", tags=["Events"])


@router.get("/", response_model=List[EventResponse])
def list_events(
    db: Session = Depends(get_db),
):
    """List all available events."""
    events = db.query(Event).order_by(Event.created_at.desc()).all()
    return [EventResponse.model_validate(e) for e in events]


@router.get("/{event_id}", response_model=EventResponse)
def get_event(
    event_id: uuid.UUID,
    db: Session = Depends(get_db),
):
    """Get single event details by id."""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )
    return EventResponse.model_validate(event)


@router.post("/", response_model=EventResponse)
def create_event(
    payload: EventCreate,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """Create a new event (Admin only)."""
    if payload.min_team_size < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="min_team_size must be at least 1",
        )
    if payload.max_team_size < payload.min_team_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="max_team_size must be greater than or equal to min_team_size",
        )

    event = Event(
        title=payload.title,
        description=payload.description,
        fee_amount=payload.fee_amount,
        is_team_event=payload.is_team_event,
        min_team_size=payload.min_team_size,
        max_team_size=payload.max_team_size,
        max_capacity=payload.max_capacity,
        event_date=payload.event_date,
        registration_deadline=payload.registration_deadline,
        poster_url=payload.poster_url,
        payment_qr_url=payload.payment_qr_url,
        status=payload.status,
        created_by=current_admin.id,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return EventResponse.model_validate(event)


@router.put("/{event_id}", response_model=EventResponse)
@router.patch("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: uuid.UUID,
    payload: EventUpdate,
    current_admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """Update event details (Admin only)."""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found",
        )

    # Determine effective team sizes for validation
    new_min = payload.min_team_size if payload.min_team_size is not None else event.min_team_size
    new_max = payload.max_team_size if payload.max_team_size is not None else event.max_team_size

    if new_min < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="min_team_size must be at least 1",
        )
    if new_max < new_min:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="max_team_size must be greater than or equal to min_team_size",
        )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(event, field, value)

    db.commit()
    db.refresh(event)
    return EventResponse.model_validate(event)
