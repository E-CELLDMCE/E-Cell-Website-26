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
    JSON,
    UniqueConstraint,
    Index,
    Enum as SQLEnum,
    func,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship

class RegistrationStatus(SQLEnum):
    pending_payment = "pending_payment"
    payment_submitted = "payment_submitted"
    pending_approval = "pending_approval"
    approved = "approved"
    rejected = "rejected"

class AdminSection(SQLEnum):
    superadmin = "superadmin"
    tech = "tech"
    social_media = "social_media"
    events = "events"
    design = "design"
    other = "other"

from app.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.event import Event


class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    event_id = Column(
        UUID(as_uuid=True),
        ForeignKey("events.id", ondelete="CASCADE"),
        nullable=False,
    )
    leader_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    team_name = Column(String(150), nullable=True)
    status = Column(
        SQLEnum("pending_payment", "payment_submitted", "pending_approval", "approved", "rejected", name="registration_status"),
        nullable=False,
        default="pending_payment",
    )
    transaction_id = Column(String(100), nullable=True)
    payment_screenshot_url = Column(Text, nullable=True)
    amount_paid = Column(Numeric(10, 2), default=0.00, nullable=True)
    is_early_bird = Column(Boolean, default=False, nullable=False, server_default="false")
    fee_charged = Column(Numeric(10, 2), nullable=True)
    retry_count = Column(Integer, default=0, nullable=False)
    verified_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=True,
    )
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        Index("idx_registrations_event", "event_id"),
        Index("idx_registrations_leader", "leader_id"),
        UniqueConstraint("event_id", "leader_id", name="event_registrations_event_id_leader_id_key"),
    )

    # Relationships
    event = relationship("Event", back_populates="registrations")
    leader = relationship(
        "User",
        back_populates="registrations_led",
        foreign_keys=[leader_id],
    )
    verifier = relationship(
        "User",
        back_populates="verified_registrations",
        foreign_keys=[verified_by],
    )
    members = relationship(
        "RegistrationMember",
        back_populates="registration",
        cascade="all, delete-orphan",
    )
    admin_actions = relationship(
        "AdminActionLog",
        back_populates="registration",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<EventRegistration id={self.id} event_id={self.event_id} status={self.status}>"


class RegistrationMember(Base):
    __tablename__ = "registration_members"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    registration_id = Column(
        UUID(as_uuid=True),
        ForeignKey("event_registrations.id", ondelete="CASCADE"),
        nullable=False,
    )
    event_id = Column(
        UUID(as_uuid=True),
        ForeignKey("events.id", ondelete="CASCADE"),
        nullable=False,
    )
    student_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )
    is_leader = Column(Boolean, default=False, nullable=False)
    ticket_qr_token = Column(UUID(as_uuid=True), nullable=True)
    ticket_used = Column(Boolean, default=False, nullable=False)
    scanned_at = Column(DateTime(timezone=True), nullable=True)
    added_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        Index("idx_regmembers_registration", "registration_id"),
        Index("idx_regmembers_student", "student_id"),
        UniqueConstraint(
            "registration_id", "student_id", name="registration_members_registration_id_student_id_key"
        ),
        UniqueConstraint(
            "ticket_qr_token", name="registration_members_ticket_qr_token_key"
        ),
        UniqueConstraint(
            "event_id", "student_id", name="registration_members_event_student_key"
        ),
    )

    # Relationships
    registration = relationship("EventRegistration", back_populates="members")
    event = relationship("Event", foreign_keys=[event_id])
    student = relationship(
        "User",
        back_populates="registration_memberships",
        foreign_keys=[student_id],
    )

    def __repr__(self) -> str:
        return f"<RegistrationMember id={self.id} event_id={self.event_id} student_id={self.student_id}>"


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    admin_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )
    action = Column(String(100), nullable=False)
    target_type = Column(String(50), nullable=False)
    target_id = Column(UUID(as_uuid=True), nullable=False)
    details = Column(JSONB, nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    admin = relationship(
        "User",
        back_populates="audit_logs",
        foreign_keys=[admin_id],
    )

    def __repr__(self) -> str:
        return f"<AuditLog id={self.id} admin_id={self.admin_id} action={self.action}>"
