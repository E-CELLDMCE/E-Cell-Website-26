from pathlib import Path
from typing import List, Union
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

ENV_PATHS = (
    Path(__file__).resolve().parent.parent / ".env",          # backend/.env
    Path(__file__).resolve().parent.parent.parent / ".env",   # repo root .env
    Path.cwd() / ".env",
    ".env",
)


class Settings(BaseSettings):
    PROJECT_NAME: str = "E-Cell Event Registration Platform API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # ---------------------------------------------------------------- Database
    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/ecell_db"

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def normalize_database_url(cls, v: str) -> str:
        if not isinstance(v, str) or not v:
            return v
        url = v.strip()
        # Ensure psycopg2 driver is specified for SQLAlchemy
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+psycopg2://", 1)
        elif url.startswith("postgresql://"):
            url = url.replace("postgresql://", "postgresql+psycopg2://", 1)

        # Parse and sanitize query parameters for Neon compatibility
        try:
            parsed = urlparse(url)
            if parsed.query:
                query_params = parse_qs(parsed.query, keep_blank_values=True)
                # Strip unsupported or conflicting parameters like channel_binding
                query_params.pop("channel_binding", None)
                new_query = urlencode(query_params, doseq=True)
                url = urlunparse(parsed._replace(query=new_query))
        except Exception:
            pass
        return url

    # --------------------------------------------------------------------- JWT
    JWT_SECRET: str = "supersecretjwtkeythatisatleast32characterslong"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    @field_validator("JWT_SECRET")
    @classmethod
    def validate_jwt_secret(cls, v: str) -> str:
        if not v or len(v.strip()) < 32:
            raise ValueError("JWT_SECRET must be at least 32 characters long for security.")
        return v

    # ---------------------------------------------------------------- CORS
    # Accepts EITHER:
    #   FRONTEND_ORIGIN=https://a.com,https://b.com
    # OR a JSON list:
    #   FRONTEND_ORIGIN=["https://a.com","https://b.com"]
    # Defaults cover local dev + the current Vercel production origin.
    FRONTEND_ORIGIN: Union[str, List[str]] = (
        "http://localhost:3000,"
        "http://localhost:5173,"
        "https://ecell-website-26.vercel.app"
    )

    @field_validator("FRONTEND_ORIGIN", mode="before")
    @classmethod
    def normalize_frontend_origin(cls, v):
        if v is None:
            return []
        if isinstance(v, list):
            return [str(item).strip() for item in v if str(item).strip()]
        if isinstance(v, str):
            raw = v.strip()
            if not raw:
                return []
            # JSON array style: ["https://a.com", "https://b.com"]
            if raw.startswith("[") and raw.endswith("]"):
                import json
                try:
                    parsed = json.loads(raw)
                    if isinstance(parsed, list):
                        return [str(item).strip() for item in parsed if str(item).strip()]
                except json.JSONDecodeError:
                    pass
            # Plain comma-separated string
            return [origin.strip() for origin in raw.split(",") if origin.strip()]
        return []

    @property
    def cors_origins(self) -> List[str]:
        """
        Final list handed to Starlette's CORSMiddleware.
        Guards against the common footgun of allow_credentials=True combined
        with allow_origins=['*'] (Starlette will reject every request in that
        combination when credentials are involved).
        """
        origins = list(self.FRONTEND_ORIGIN) if isinstance(self.FRONTEND_ORIGIN, list) else []
        if not origins:
            return []
        # De-duplicate, preserve order
        seen = set()
        cleaned: List[str] = []
        for origin in origins:
            if origin and origin not in seen:
                seen.add(origin)
                cleaned.append(origin)
        return cleaned

    # ------------------------------------------------------------ Cloudinary
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    CLOUDINARY_API_URL: str = ""

    # ----------------------------------------------------------------- Brevo
    BREVO_API_KEY: str = ""
    BREVO_SENDER_EMAIL: str = "noreply@ecell.college.edu"

    # ------------------------------------------ Initial Superadmin Seeding
    INITIAL_ADMIN_EMAIL: str = "admin@ecell.college.edu"
    INITIAL_ADMIN_PASSWORD: str = ""

    @field_validator("INITIAL_ADMIN_PASSWORD")
    @classmethod
    def validate_initial_admin_password(cls, v: str) -> str:
        if v and len(v.strip()) > 0 and len(v.strip()) < 12:
            raise ValueError("INITIAL_ADMIN_PASSWORD must be at least 12 characters long if set.")
        return v

    # --------------------------------------- Superadmin Password Auth
    # Optional so a missing env var does NOT crash the service on boot.
    # Anything that needs these values must validate at the point of use.
    ADMIN_EMAIL: str = ""
    ADMIN_PASSWORD: str = ""

    @field_validator("ADMIN_PASSWORD")
    @classmethod
    def validate_admin_password(cls, v: str) -> str:
        if v and len(v.strip()) > 0 and len(v.strip()) < 12:
            raise ValueError("ADMIN_PASSWORD must be at least 12 characters long if set.")
        return v

    model_config = SettingsConfigDict(
        env_file=ENV_PATHS,
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()