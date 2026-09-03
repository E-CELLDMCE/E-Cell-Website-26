import logging
import time
from typing import Optional
import cloudinary
import cloudinary.uploader
import cloudinary.utils
from fastapi import HTTPException, UploadFile, status

from app.config import settings

logger = logging.getLogger(__name__)


def is_cloudinary_configured() -> bool:
    """Checks if Cloudinary has required configuration keys."""
    if settings.CLOUDINARY_API_URL and settings.CLOUDINARY_API_URL.strip():
        return True
    return bool(
        settings.CLOUDINARY_CLOUD_NAME
        and settings.CLOUDINARY_CLOUD_NAME.strip()
        and settings.CLOUDINARY_API_KEY
        and settings.CLOUDINARY_API_KEY.strip()
        and settings.CLOUDINARY_API_SECRET
        and settings.CLOUDINARY_API_SECRET.strip()
    )


def ensure_cloudinary_configured():
    """Ensures Cloudinary SDK is configured; raises HTTPException if missing."""
    if not is_cloudinary_configured():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Cloudinary is not configured. Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET in environment.",
        )
    if settings.CLOUDINARY_API_URL and settings.CLOUDINARY_API_URL.strip():
        cloudinary.config(cloudinary_url=settings.CLOUDINARY_API_URL.strip(), secure=True)
    else:
        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME.strip(),
            api_key=settings.CLOUDINARY_API_KEY.strip(),
            api_secret=settings.CLOUDINARY_API_SECRET.strip(),
            secure=True,
        )


def generate_signed_url(
    public_id: str,
    format: Optional[str] = None,
    expiry_seconds: int = 600,
) -> str:
    """
    Generates a signed URL for an authenticated Cloudinary asset with a short expiry (default 10 minutes).
    Never returns a raw public Cloudinary URL.
    """
    ensure_cloudinary_configured()
    expires_at = int(time.time()) + expiry_seconds

    if format:
        return cloudinary.utils.private_download_url(
            public_id,
            format=format,
            type="authenticated",
            expires_at=expires_at,
        )

    # Fallback to signed delivery URL
    url, _ = cloudinary.utils.cloudinary_url(
        public_id,
        type="authenticated",
        sign_url=True,
        secure=True,
    )
    return url


async def _upload_authenticated_image(
    file: UploadFile,
    folder: str,
    expiry_minutes: int = 10,
) -> str:
    """
    Validates image file, ensures Cloudinary is configured, uploads with type='authenticated',
    and returns a signed URL with a short expiration.
    """
    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file cannot be empty",
        )

    # If Cloudinary is not configured in local environment, return base64 data URI fallback
    if not is_cloudinary_configured():
        import base64
        mime = content_type if content_type else "image/png"
        encoded = base64.b64encode(file_bytes).decode("utf-8")
        return f"data:{mime};base64,{encoded}"

    try:
        ensure_cloudinary_configured()
        upload_result = cloudinary.uploader.upload(
            file_bytes,
            folder=folder,
            type="authenticated",
            resource_type="image",
            use_filename=True,
            unique_filename=True,
        )
        public_id = upload_result.get("public_id")
        fmt = upload_result.get("format")
        return generate_signed_url(public_id, format=fmt, expiry_seconds=expiry_minutes * 60)
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Cloudinary upload failure: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image to Cloudinary: {str(exc)}",
        )


async def upload_payment_screenshot(file: UploadFile) -> str:
    """Uploads payment screenshot to Cloudinary as type='authenticated' and returns signed URL."""
    return await _upload_authenticated_image(file, folder="ecell/payments", expiry_minutes=10)


async def upload_poster_image(file: UploadFile) -> str:
    """Uploads event poster image to Cloudinary as type='authenticated' and returns signed URL."""
    return await _upload_authenticated_image(file, folder="ecell/posters", expiry_minutes=10)


async def upload_payment_qr(file: UploadFile) -> str:
    """Uploads payment QR code to Cloudinary as type='authenticated' and returns signed URL."""
    return await _upload_authenticated_image(file, folder="ecell/qrcodes", expiry_minutes=10)
