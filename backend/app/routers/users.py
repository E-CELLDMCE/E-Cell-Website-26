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
@router.post("/me", response_model=UserResponse)
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
    if payload.division is not None:
        current_user.division = payload.division.strip() if payload.division else None
    if payload.roll_number is not None:
        current_user.roll_number = payload.roll_number.strip() if payload.roll_number else None

    # Check uniqueness of (branch, division, roll_number, year) combination
    final_branch = current_user.branch
    final_division = current_user.division
    final_roll_number = current_user.roll_number
    final_year = current_user.year
    if final_branch and final_division and final_roll_number and final_year:
        duplicate = (
            db.query(User)
            .filter(
                User.branch == final_branch,
                User.division == final_division,
                User.roll_number == final_roll_number,
                User.year == final_year,
                User.id != current_user.id,
            )
            .first()
        )
        if duplicate:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"A student with the same Branch, Division, and Roll Number is already registered",
            )

    db.commit()
    db.refresh(current_user)

    return UserResponse.model_validate(current_user)
