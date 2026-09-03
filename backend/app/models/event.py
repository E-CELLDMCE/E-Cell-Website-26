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
    func,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

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
        index=True,
    )
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    poster_url = Column(String(500), nullable=True)
    payment_qr_url = Column(String(500), nullable=True)
    fee_amount = Column(Numeric(10, 2), default=0.00, nullable=False)
    is_team_event = Column(Boolean, default=False, nullable=False)
    min_team_size = Column(Integer, default=1, nullable=False)
    max_team_size = Column(Integer, default=1, nullable=False)
    max_capacity = Column(Integer, nullable=True)
    registration_deadline = Column(DateTime(timezone=True), nullable=True)
    event_date = Column(DateTime(timezone=True), nullable=True)
    status = Column(
        SQLEnum(
            "upcoming",
            "ongoing",
            "completed",
            "cancelled",
            name="event_status_enum",
            native_enum=False,
        ),
        nullable=False,
        default="upcoming",
    )
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
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

    def __repr__(self) -> str:
        return f"<Event id={self.id} title={self.title} status={self.status}>"
