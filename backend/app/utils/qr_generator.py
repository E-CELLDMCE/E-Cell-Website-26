import base64
import io
import qrcode
from qrcode.image.pil import PilImage


def generate_qr_base64(data: str) -> str:
    """
    Generate a base64 encoded PNG QR code image data URI for the provided data string.
    Returns format: data:image/png;base64,...
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(str(data))
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    img_bytes = buffer.getvalue()
    b64_encoded = base64.b64encode(img_bytes).decode("utf-8")
    return f"data:image/png;base64,{b64_encoded}"
