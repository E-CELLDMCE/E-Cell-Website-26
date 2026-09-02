from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserProfileUpdate, UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
):
    """Returns profile of currently authenticated user."""
    return UserResponse.model_validate(current_user)


@router.patch("/me", response_model=UserResponse)
def update_user_profile(
    payload: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Updates profile fields (especially stdid, phone, branch, year) required for team lookup & registration.
    Enforces uniqueness of stdid.
    """
    clean_stdid = payload.stdid.strip()

    # Check if another user already has this stdid
    existing_user = (
        db.query(User)
        .filter(User.stdid == clean_stdid, User.id != current_user.id)
        .first()
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Student ID '{clean_stdid}' is already registered to another account",
        )

    current_user.stdid = clean_stdid
    if payload.phone is not None:
        current_user.phone = payload.phone.strip() if payload.phone else None
    if payload.branch is not None:
        current_user.branch = payload.branch.strip() if payload.branch else None
    if payload.year is not None:
        current_user.year = payload.year

    db.commit()
    db.refresh(current_user)

    return UserResponse.model_validate(current_user)
