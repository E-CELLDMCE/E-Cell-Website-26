from contextlib import asynccontextmanager
from decimal import Decimal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.config import settings
from app.core.security import hash_password
from app.database import Base, engine, SessionLocal
from app.models.event import Event
from app.models.user import User, AdminProfile
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.events import router as events_router
from app.routers.registrations import router as registrations_router
from app.routers.admin import router as admin_router


def ensure_superadmin_exists():
    """
    Checks if a user with role='admin' and email=settings.ADMIN_EMAIL exists in DB.
    If not, creates one automatically with hashed password and matching admin_profiles row (section='superadmin').
    """
    db = SessionLocal()
    try:
        admin_email = settings.ADMIN_EMAIL.strip()
        admin = db.query(User).filter(User.email.ilike(admin_email)).first()
        hashed_pwd = hash_password(settings.ADMIN_PASSWORD)

        if not admin:
            admin = User(
                email=admin_email,
                name="E-Cell Superadmin",
                role="admin",
                password_hash=hashed_pwd,
                oauth_provider="local",
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)

            admin_prof = AdminProfile(user_id=admin.id, section="superadmin")
            db.add(admin_prof)
            db.commit()
        else:
            # User exists: ensure role='admin', password_hash is set, and admin_profile is superadmin
            updated = False
            if admin.role != "admin":
                admin.role = "admin"
                updated = True
            if not admin.password_hash:
                admin.password_hash = hashed_pwd
                updated = True
            if updated:
                db.commit()
                db.refresh(admin)

            admin_prof = db.query(AdminProfile).filter(AdminProfile.user_id == admin.id).first()
            if not admin_prof:
                admin_prof = AdminProfile(user_id=admin.id, section="superadmin")
                db.add(admin_prof)
                db.commit()
            elif admin_prof.section != "superadmin":
                admin_prof.section = "superadmin"
                db.commit()
    except Exception as e:
        db.rollback()
        print(f"[Superadmin Startup] Error ensuring superadmin exists: {e}")
    finally:
        db.close()


def seed_initial_data():
    """Seeds initial events and demo users for testing if database is empty."""
    from datetime import datetime, timezone, timedelta
    db = SessionLocal()
    try:
        # Ensure admin exists first
        admin = db.query(User).filter(User.email.ilike(settings.ADMIN_EMAIL.strip())).first()
        if not admin:
            ensure_superadmin_exists()
            admin = db.query(User).filter(User.email.ilike(settings.ADMIN_EMAIL.strip())).first()

        # Check if events exist
        if db.query(Event).count() == 0:
            now = datetime.now(timezone.utc)
            # Create sample events
            event1 = Event(
                title="E-Summit 2026: Pitch Tank",
                description="Flagship startup pitch competition. Form a team of 2-4 innovators to pitch your venture to angel investors.",
                fee_amount=Decimal("299.00"),
                is_team_event=True,
                min_team_size=2,
                max_team_size=4,
                event_date=now + timedelta(days=14),
                registration_deadline=now + timedelta(days=10),
                status="upcoming",
                created_by=admin.id,
            )
            event2 = Event(
                title="Hack-a-Preneur 24-Hour Hackathon",
                description="Build a high-impact SaaS solution in 24 hours. Teams of 2 to 3 members.",
                fee_amount=Decimal("199.00"),
                is_team_event=True,
                min_team_size=2,
                max_team_size=3,
                event_date=now + timedelta(days=21),
                registration_deadline=now + timedelta(days=18),
                status="upcoming",
                created_by=admin.id,
            )
            event3 = Event(
                title="Keynote: Future of AI in Startups",
                description="Individual entry pass for keynote sessions and networking lunch.",
                fee_amount=Decimal("0.00"),
                is_team_event=False,
                min_team_size=1,
                max_team_size=1,
                event_date=now + timedelta(days=7),
                registration_deadline=now + timedelta(days=6),
                status="upcoming",
                created_by=admin.id,
            )
            db.add_all([event1, event2, event3])
            db.commit()

        # Ensure sample students exist for testing teammate lookup
        student1 = db.query(User).filter(User.email == "rahul.sharma@college.edu").first()
        if not student1:
            student1 = User(
                email="rahul.sharma@college.edu",
                name="Rahul Sharma",
                role="student",
                stdid="STD2026001",
                branch="Computer Science",
                year=3,
                phone="9876543210",
                oauth_provider="dev_seed",
            )
            db.add(student1)

        student2 = db.query(User).filter(User.email == "ananya.patel@college.edu").first()
        if not student2:
            student2 = User(
                email="ananya.patel@college.edu",
                name="Ananya Patel",
                role="student",
                stdid="STD2026002",
                branch="Information Technology",
                year=3,
                phone="9876543211",
                oauth_provider="dev_seed",
            )
            db.add(student2)

        student3 = db.query(User).filter(User.email == "vikram.singh@college.edu").first()
        if not student3:
            student3 = User(
                email="vikram.singh@college.edu",
                name="Vikram Singh",
                role="student",
                stdid="STD2026003",
                branch="Electronics",
                year=2,
                phone="9876543212",
                oauth_provider="dev_seed",
            )
            db.add(student3)

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"[Seed] Warning during initial seed: {e}")
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure database tables are created and seed data
    try:
        Base.metadata.create_all(bind=engine)
        # Ensure password_hash column exists on users table if already provisioned
        try:
            with engine.connect() as conn:
                conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);"))
                conn.commit()
        except Exception:
            pass
        ensure_superadmin_exists()
        seed_initial_data()
    except Exception as e:
        print(f"[DB Startup] Startup initialization warning: {e}")
    yield
    # Shutdown


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="E-Cell Event Registration, Payment Verification, and Live QR Scanning Backend",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:8000",
]
if hasattr(settings, "cors_origins") and settings.cors_origins:
    origins.extend(settings.cors_origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev/testing frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 routers
app.include_router(auth_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")
app.include_router(events_router, prefix="/api/v1")
app.include_router(registrations_router, prefix="/api/v1")
app.include_router(admin_router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "status": "online",
        "message": "E-Cell Event Registration Platform API is running",
        "docs": "/docs",
    }


@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}
