import uuid
from datetime import datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, Field


class TeamRegistrationCreate(BaseModel):
    event_id: uuid.UUID
    team_name: Optional[str] = None
    member_stdids: List[str] = Field(default_factory=list, description="List of teammate stdids excluding leader")


class PaymentSubmitRequest(BaseModel):
    transaction_id: str = Field(..., min_length=1, description="UPI/Bank transaction reference ID")


class TicketScanRequest(BaseModel):
    ticket_qr_token: uuid.UUID


class TicketScanResponse(BaseModel):
    message: str
    member_name: str
    student_id: str
    team_name: str
    scanned_at: Optional[datetime] = None


class MemberTicketResponse(BaseModel):
    ticket_qr_token: uuid.UUID
    event_title: str
    event_date: Optional[datetime] = None
    team_name: Optional[str] = None
    ticket_used: bool
    scanned_at: Optional[datetime] = None
    qr_code_base64: str


class RegistrationMemberDetail(BaseModel):
    id: uuid.UUID
    student_id: uuid.UUID
    student_name: str
    student_email: str
    student_stdid: Optional[str] = None
    is_leader: bool
    ticket_qr_token: Optional[uuid.UUID] = None
    ticket_used: bool
    scanned_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class RegistrationDetailResponse(BaseModel):
    id: uuid.UUID
    event_id: uuid.UUID
    event_title: Optional[str] = None
    leader_id: uuid.UUID
    leader_name: Optional[str] = None
    leader_email: Optional[str] = None
    leader_stdid: Optional[str] = None
    team_name: Optional[str] = None
    status: str
    transaction_id: Optional[str] = None
    payment_screenshot_url: Optional[str] = None
    amount_paid: Decimal
    retry_count: int
    created_at: datetime
    verified_at: Optional[datetime] = None
    members: List[RegistrationMemberDetail] = Field(default_factory=list)

    class Config:
        from_attributes = True


class RegistrationSimpleResponse(BaseModel):
    id: uuid.UUID
    event_id: uuid.UUID
    team_name: Optional[str] = None
    status: str
    amount_paid: Decimal
    message: str
