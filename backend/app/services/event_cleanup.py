from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from app.models.event import Event
from app.models.registration import EventRegistration, RegistrationMember, AuditLog
from app.models.user import User


def purge_expired_deleted_events(db: Session, retention_days: int = 7) -> int:
    """
    Permanently deletes events that have been soft-deleted for more than retention_days (default: 7 days),
    along with their associated registration members and event registrations.
    """
    cutoff = datetime.now(timezone.utc) - timedelta(days=retention_days)
    expired_events = (
        db.query(Event)
        .filter(
            Event.deleted_at.isnot(None),
            Event.deleted_at <= cutoff,
        )
        .all()
    )

    purged_count = 0
    for event in expired_events:
        event_id = event.id
        title = event.title
        deleted_time_str = event.deleted_at.isoformat() if event.deleted_at else "unknown"

        # 1. Delete associated registration members (tickets)
        db.query(RegistrationMember).filter(RegistrationMember.event_id == event_id).delete(synchronize_session=False)

        # 2. Delete associated registrations
        db.query(EventRegistration).filter(EventRegistration.event_id == event_id).delete(synchronize_session=False)

        # 3. Add audit log entry for permanent purge if admin exists
        admin_id = event.created_by
        if not admin_id:
            first_admin = db.query(User).filter(User.role == "admin").first()
            if first_admin:
                admin_id = first_admin.id

        if admin_id:
            audit = AuditLog(
                admin_id=admin_id,
                action="permanent_purge_expired_event",
                target_type="event",
                target_id=str(event_id),
                details={
                    "title": title,
                    "deleted_at": deleted_time_str,
                    "purged_after_days": retention_days,
                },
            )
            db.add(audit)

        # 4. Delete the event record permanently
        db.delete(event)
        purged_count += 1

    if purged_count > 0:
        db.commit()

    return purged_count
