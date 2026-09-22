import uuid
from typing import TYPE_CHECKING
from sqlalchemy import (
    Column,
    String,
    Text,
    Boolean,
    Integer,
    Numeric,
    DateTime,
    ForeignKey,
    Enum as SQLEnum,
    CheckConstraint,
    Index,
    func,
)
from sqlalchemy.dialects.postgresql import UUID
import sqlalchemy as sa
from sqlalchemy.orm import relationship

class EventStatus(SQLEnum):
    upcoming = "upcoming"
    ongoing = "ongoing"
    completed = "completed"
    cancelled = "cancelled"
    pending_approval = "pending_approval"

from app.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.registration import EventRegistration


class Event(Base):
    __tablename__ = "events"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    poster_url = Column(Text, nullable=True)
    payment_qr_url = Column(Text, nullable=True)
    fee_amount = Column(Numeric(10, 2), default=0.00, nullable=False)
    early_bird_enabled = Column(Boolean, default=False, nullable=False, server_default=sa.text("false"))
    early_bird_capacity = Column(Integer, nullable=True)
    early_bird_fee = Column(Numeric(10, 2), nullable=True)
    early_bird_taken = Column(Integer, default=0, nullable=False, server_default=sa.text("0"))
    is_team_event = Column(Boolean, default=False, nullable=False)
    min_team_size = Column(Integer, default=1, nullable=False)
    max_team_size = Column(Integer, default=1, nullable=False)
    max_capacity = Column(Integer, nullable=True)
    registration_deadline = Column(DateTime(timezone=True), nullable=True)
    event_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(
        SQLEnum("upcoming", "ongoing", "completed", "cancelled", "pending_approval", name="event_status"),
        nullable=False,
        default="upcoming",
    )
    completed_at = Column(DateTime(timezone=True), nullable=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True, index=True)
    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    creator = relationship(
        "User",
        back_populates="created_events",
        foreign_keys=[created_by],
    )
    registrations = relationship(
        "EventRegistration",
        back_populates="event",
        cascade="all, delete-orphan",
    )

    __table_args__ = (
        CheckConstraint("max_team_size >= min_team_size", name="events_check"),
    )

    def __repr__(self) -> str:
        return f"<Event id={self.id} title={self.title} status={self.status}>"
