import uuid
from typing import TYPE_CHECKING
from sqlalchemy import (
    Column,
    String,
    Boolean,
    Integer,
    Numeric,
    DateTime,
    ForeignKey,
    JSON,
    UniqueConstraint,
    Enum as SQLEnum,
    func,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

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
        index=True,
    )
    event_id = Column(
        UUID(as_uuid=True),
        ForeignKey("events.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    leader_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    team_name = Column(String(255), nullable=True)
    status = Column(
        SQLEnum(
            "pending_payment",
            "pending_approval",
            "approved",
            "rejected",
            name="registration_status_enum",
            native_enum=False,
        ),
        nullable=False,
        default="pending_payment",
        index=True,
    )
    transaction_id = Column(String(255), nullable=True)
    payment_screenshot_url = Column(String(500), nullable=True)
    amount_paid = Column(Numeric(10, 2), default=0.00, nullable=False)
    retry_count = Column(Integer, default=0, nullable=False)
    verified_by = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint("event_id", "leader_id", name="uq_event_registrations_event_leader"),
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

    def __repr__(self) -> str:
        return f"<EventRegistration id={self.id} event_id={self.event_id} status={self.status}>"


class RegistrationMember(Base):
    __tablename__ = "registration_members"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )
    registration_id = Column(
        UUID(as_uuid=True),
        ForeignKey("event_registrations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    event_id = Column(
        UUID(as_uuid=True),
        ForeignKey("events.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    student_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    is_leader = Column(Boolean, default=False, nullable=False)
    ticket_qr_token = Column(UUID(as_uuid=True), unique=True, nullable=True, index=True)
    ticket_used = Column(Boolean, default=False, nullable=False)
    scanned_at = Column(DateTime(timezone=True), nullable=True)
    added_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint(
            "registration_id", "student_id", name="uq_registration_members_reg_student"
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
        index=True,
    )
    admin_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    action = Column(String(255), nullable=False)
    target_type = Column(String(100), nullable=True)
    target_id = Column(String(255), nullable=True)
    details = Column(JSON, nullable=True)
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
