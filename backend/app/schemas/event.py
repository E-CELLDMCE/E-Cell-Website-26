import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, Field, model_validator


class EventBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    fee_amount: Decimal = Field(default=Decimal("0.00"))
    is_team_event: bool = False
    min_team_size: int = Field(default=1, ge=1)
    max_team_size: int = Field(default=1, ge=1)
    max_capacity: Optional[int] = None
    event_date: Optional[datetime] = None
    registration_deadline: Optional[datetime] = None
    poster_url: Optional[str] = None
    payment_qr_url: Optional[str] = None
    status: str = "upcoming"

    @model_validator(mode="after")
    def validate_team_sizes(self):
        if self.min_team_size < 1:
            raise ValueError("min_team_size must be at least 1")
        if self.max_team_size < self.min_team_size:
            raise ValueError("max_team_size must be greater than or equal to min_team_size")
        return self


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    fee_amount: Optional[Decimal] = None
    is_team_event: Optional[bool] = None
    min_team_size: Optional[int] = Field(None, ge=1)
    max_team_size: Optional[int] = Field(None, ge=1)
    max_capacity: Optional[int] = None
    event_date: Optional[datetime] = None
    registration_deadline: Optional[datetime] = None
    poster_url: Optional[str] = None
    payment_qr_url: Optional[str] = None
    status: Optional[str] = None

    @model_validator(mode="after")
    def validate_team_sizes(self):
        if self.min_team_size is not None and self.min_team_size < 1:
            raise ValueError("min_team_size must be at least 1")
        if (
            self.min_team_size is not None
            and self.max_team_size is not None
            and self.max_team_size < self.min_team_size
        ):
            raise ValueError("max_team_size must be greater than or equal to min_team_size")
        return self


class EventResponse(EventBase):
    id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True
