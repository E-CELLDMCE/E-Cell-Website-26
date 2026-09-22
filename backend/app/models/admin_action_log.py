import uuid
from typing import TYPE_CHECKING
from sqlalchemy import (
    Column,
    String,
    Text,
    DateTime,
    ForeignKey,
    Enum as SQLEnum,
    func,
    Index,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

class AdminActionEnum(SQLEnum):
    verified = "verified"
    rejected = "rejected"

from app.database import Base

if TYPE_CHECKING:
    from app.models.registration import EventRegistration
    from app.models.user import User


class AdminActionLog(Base):
    __tablename__ = "admin_action_logs"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    registration_id = Column(
        UUID(as_uuid=True),
        ForeignKey("event_registrations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    admin_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    action = Column(
        SQLEnum("verified", "rejected", name="admin_action_enum"),
        nullable=False,
    )
    reason = Column(Text, nullable=True)
    timestamp = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    registration = relationship("EventRegistration", back_populates="admin_actions")
    admin = relationship("User", back_populates="admin_action_logs")

    def __repr__(self) -> str:
        return f"<AdminActionLog id={self.id} registration_id={self.registration_id} action={self.action}>"