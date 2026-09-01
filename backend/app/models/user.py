import uuid
from typing import TYPE_CHECKING
from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Enum as SQLEnum,
    func,
)
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models.event import Event
    from app.models.registration import EventRegistration, RegistrationMember, AuditLog


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )
    stdid = Column(String(50), unique=True, nullable=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    role = Column(
        SQLEnum("student", "admin", name="user_role_enum", native_enum=False),
        nullable=False,
        default="student",
    )
    branch = Column(String(100), nullable=True)
    year = Column(String(50), nullable=True)
    oauth_provider = Column(String(50), nullable=True)
    oauth_id = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    admin_profile = relationship(
        "AdminProfile",
        back_populates="user",
        uselist=False,
        foreign_keys="[AdminProfile.user_id]",
        cascade="all, delete-orphan",
    )
    created_events = relationship(
        "Event",
        back_populates="creator",
        foreign_keys="[Event.created_by]",
    )
    registrations_led = relationship(
        "EventRegistration",
        back_populates="leader",
        foreign_keys="[EventRegistration.leader_id]",
    )
    verified_registrations = relationship(
        "EventRegistration",
        back_populates="verifier",
        foreign_keys="[EventRegistration.verified_by]",
    )
    registration_memberships = relationship(
        "RegistrationMember",
        back_populates="student",
        foreign_keys="[RegistrationMember.student_id]",
    )
    audit_logs = relationship(
        "AuditLog",
        back_populates="admin",
        foreign_keys="[AuditLog.admin_id]",
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email} role={self.role}>"


class AdminProfile(Base):
    __tablename__ = "admin_profiles"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )
    section = Column(
        SQLEnum(
            "superadmin",
            "tech",
            "social_media",
            "events",
            "design",
            "other",
            name="admin_section_enum",
            native_enum=False,
        ),
        nullable=False,
        default="other",
    )
    managed_events = Column(ARRAY(UUID(as_uuid=True)), nullable=True, default=list)
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
    user = relationship("User", back_populates="admin_profile", foreign_keys=[user_id])
    creator = relationship("User", foreign_keys=[created_by])

    def __repr__(self) -> str:
        return f"<AdminProfile id={self.id} user_id={self.user_id} section={self.section}>"
