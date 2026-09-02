import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, Field


class EventBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    fee_amount: Decimal = Field(default=Decimal("0.00"))
    is_team_event: bool = False
    min_team_size: int = Field(default=1, ge=1)
    max_team_size: int = Field(default=1, ge=1)
    event_date: Optional[datetime] = None
    registration_deadline: Optional[datetime] = None
    poster_url: Optional[str] = None
    payment_qr_url: Optional[str] = None
    status: str = "upcoming"


class EventCreate(EventBase):
    pass


class EventResponse(EventBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True
