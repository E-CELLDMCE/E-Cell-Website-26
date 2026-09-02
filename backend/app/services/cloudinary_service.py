import base64
import logging
import cloudinary
import cloudinary.uploader
from fastapi import HTTPException, UploadFile, status

from app.config import settings

logger = logging.getLogger(__name__)

# Configure Cloudinary if credentials are present
if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,
    )


async def upload_payment_screenshot(file: UploadFile) -> str:
    """
    Uploads payment screenshot image file to Cloudinary folder 'ecell/payments/'
    and returns the secure_url.
    Falls back gracefully if Cloudinary credentials are not configured (e.g. local dev).
    """
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Valid payment screenshot file must be uploaded",
        )

    # Validate file type
    content_type = file.content_type or ""
    if not (content_type.startswith("image/") or file.filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must be an image (PNG, JPG, JPEG, WEBP)",
        )

    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file cannot be empty",
        )

    # Check Cloudinary credentials
    if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET:
        try:
            upload_result = cloudinary.uploader.upload(
                file_bytes,
                folder="ecell/payments",
                resource_type="image",
                use_filename=True,
                unique_filename=True,
            )
            return upload_result.get("secure_url", upload_result.get("url"))
        except Exception as exc:
            logger.warning(f"Cloudinary upload error: {exc}. Falling back to data URI format.")
            b64_str = base64.b64encode(file_bytes).decode("utf-8")
            mime = file.content_type or "image/png"
            return f"data:{mime};base64,{b64_str}"
    else:
        # Fallback for local testing when Cloudinary API keys are not supplied in env
        b64_str = base64.b64encode(file_bytes).decode("utf-8")
        mime = file.content_type or "image/png"
        return f"data:{mime};base64,{b64_str}"
