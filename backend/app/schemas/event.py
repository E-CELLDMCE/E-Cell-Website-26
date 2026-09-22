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
    early_bird_enabled: Optional[bool] = False
    early_bird_capacity: Optional[int] = None
    early_bird_fee: Optional[Decimal] = None

    @model_validator(mode="after")
    def validate_team_sizes(self):
        if self.min_team_size < 1:
            raise ValueError("min_team_size must be at least 1")
        if self.max_team_size < self.min_team_size:
            raise ValueError("max_team_size must be greater than or equal to min_team_size")
        return self


class EventCreate(EventBase):
    pass

    @model_validator(mode="after")
    def validate_early_bird(self):
        if self.early_bird_enabled:
            if self.early_bird_capacity is None or self.early_bird_fee is None:
                raise ValueError("early_bird_capacity and early_bird_fee must be provided when early_bird_enabled is True")
            if self.early_bird_capacity <= 0:
                raise ValueError("early_bird_capacity must be greater than 0")
            if self.early_bird_fee <= 0:
                raise ValueError("early_bird_fee must be greater than 0")
            if self.early_bird_fee >= self.fee_amount:
                raise ValueError("early_bird_fee must be less than fee_amount")
        return self


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
    early_bird_enabled: Optional[bool] = None
    early_bird_capacity: Optional[int] = None
    early_bird_fee: Optional[Decimal] = None

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

    @model_validator(mode="after")
    def validate_early_bird(self):
        if self.early_bird_enabled is True:
            # Note: when updating, capacity and fee must still be positive if enabled
            # But we don't enforce full consistency here since partial updates may occur
            pass
        return self


class EventResponse(EventBase):
    id: uuid.UUID
    created_at: datetime
    early_bird_taken: int = 0

    class Config:
        from_attributes = True
