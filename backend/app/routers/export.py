from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.registration import EventRegistration, RegistrationMember
from app.models.user import User
from app.services.excel_service import create_excel

router = APIRouter()


def get_approved_students(event_id: UUID, db: Session):
    rows = (
        db.query(
            User.name.label("name"),
            User.branch.label("branch"),
            User.year.label("year"),
            EventRegistration.team_name.label("team_name"),
        )
        .join(
            RegistrationMember,
            RegistrationMember.student_id == User.id,
        )
        .join(
            EventRegistration,
            EventRegistration.id == RegistrationMember.registration_id,
        )
        .filter(
            EventRegistration.event_id == event_id,
            EventRegistration.status == "approved",
        )
        .all()
    )

    return [
        {
            "name": row.name,
            "branch": row.branch,
            "year": row.year,
            "team_name": row.team_name,
        }
        for row in rows
    ]

@router.get("/admin/export/{event_id}")
def export_event_students(
    event_id: UUID,
    db: Session = Depends(get_db),
):
    rows = get_approved_students(event_id, db)

    excel_file = create_excel(rows)

    return StreamingResponse(
        excel_file,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f"attachment; filename=event_{event_id}_approved_students.xlsx"
        },
    )