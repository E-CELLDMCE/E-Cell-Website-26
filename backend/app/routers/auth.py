from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.config import settings
from app.core.security import create_access_token, verify_password
from app.database import get_db
from app.models.user import User, AdminProfile
from app.schemas.user import (
    GoogleCallbackRequest,
    DevLoginRequest,
    AdminLoginRequest,
    TokenResponse,
    UserResponse,
)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/google-callback", response_model=TokenResponse)
def google_callback(
    payload: GoogleCallbackRequest,
    db: Session = Depends(get_db),
):
    """
    Neon DB / Google OAuth callback endpoint.
    Upserts user record into 'users' table via email and oauth_id.
    Returns backend JWT access token.
    """
    clean_email = payload.email.strip().lower()
    user = db.query(User).filter(func.lower(User.email) == clean_email).first()

    if user:
        # Update existing user OAuth info if missing
        if payload.oauth_id and not user.oauth_id:
            user.oauth_id = payload.oauth_id
        if payload.oauth_provider and not user.oauth_provider:
            user.oauth_provider = payload.oauth_provider
        if payload.name and not user.name:
            user.name = payload.name
        # Ensure admin users have a superadmin profile
        if user.role == "admin":
            if not user.admin_profile:
                admin_prof = AdminProfile(user_id=user.id, section="superadmin")
                db.add(admin_prof)
            elif user.admin_profile.section != "superadmin":
                user.admin_profile.section = "superadmin"
        db.commit()
        db.refresh(user)
    else:
        # Create new user record
        user = User(
            email=clean_email,
            name=payload.name,
            role="student",
            oauth_provider=payload.oauth_provider or "google",
            oauth_id=payload.oauth_id,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token(data={"sub": str(user.id), "email": user.email, "role": user.role})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )


@router.post("/dev-login", response_model=TokenResponse)
def dev_login(
    payload: DevLoginRequest,
    db: Session = Depends(get_db),
):
    """
    Development/Testing login endpoint to easily authenticate as student or admin.
    Upserts user and generates JWT.
    """
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        user = User(
            email=payload.email,
            name=payload.name or payload.email.split("@")[0],
            role=payload.role or "student",
            stdid=payload.stdid,
            oauth_provider="dev_login",
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        if user.role == "admin":
            admin_prof = AdminProfile(user_id=user.id, section="superadmin")
            db.add(admin_prof)
            db.commit()
    else:
        if payload.role and user.role != payload.role:
            user.role = payload.role
            if user.role == "admin" and not user.admin_profile:
                admin_prof = AdminProfile(user_id=user.id, section="superadmin")
                db.add(admin_prof)
        if payload.stdid and not user.stdid:
            user.stdid = payload.stdid
        db.commit()
        db.refresh(user)

    token = create_access_token(data={"sub": str(user.id), "email": user.email, "role": user.role})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )


@router.post("/admin-login", response_model=TokenResponse)
def admin_login(
    payload: AdminLoginRequest,
    db: Session = Depends(get_db),
):
    """
    Superadmin password login endpoint.
    Accepts email + password.
    ONLY works for the account matching ADMIN_EMAIL (rejects any other email).
    Verifies password against stored hash, issues same JWT format used elsewhere in the app.
    """
    input_email = payload.email.strip().lower()
    configured_admin_email = settings.ADMIN_EMAIL.strip().lower()

    # Reject any other email attempting password login
    if input_email != configured_admin_email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = (
        db.query(User)
        .filter(func.lower(User.email) == configured_admin_email)
        .first()
    )

    if (
        not user
        or not user.password_hash
        or not verify_password(payload.password, user.password_hash)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )

    token = create_access_token(data={"sub": str(user.id), "email": user.email, "role": user.role})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )
