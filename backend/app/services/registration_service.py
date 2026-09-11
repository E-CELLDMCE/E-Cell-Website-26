import uuid
from sqlalchemy.orm import Session

from app.models.registration import EventRegistration, RegistrationMember


def generate_tickets_for_registration(
    db: Session, registration: EventRegistration
) -> None:
    """
    Generate a uuid4 ticket_qr_token for every member row of the given
    registration that does not yet have one. Caller is responsible for
    transaction boundaries (flush/commit).
    """
    members = (
        db.query(RegistrationMember)
        .filter(RegistrationMember.registration_id == registration.id)
        .with_for_update()
        .all()
    )
    for member in members:
        if member.ticket_qr_token is None:
            member.ticket_qr_token = uuid.uuid4()