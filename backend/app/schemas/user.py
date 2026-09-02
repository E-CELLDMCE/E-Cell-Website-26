import uuid
from typing import Optional, Union
from pydantic import BaseModel, Field, field_validator


class UserProfileUpdate(BaseModel):
    stdid: str = Field(..., min_length=1, max_length=50, description="Student ID number e.g. STD2026001")
    phone: Optional[str] = Field(None, max_length=20, description="Contact phone number")
    branch: Optional[str] = Field(None, max_length=100, description="College branch e.g. Computer Science")
    year: Optional[Union[int, str]] = Field(None, description="Year of study e.g. 1, 2, 3, 4")

    @field_validator("year", mode="before")
    @classmethod
    def parse_year(cls, v):
        if v is None or v == "":
            return None
        if isinstance(v, int):
            return v
        if isinstance(v, str):
            digits = "".join(filter(str.isdigit, v))
            if digits:
                return int(digits)
        return None


class UserResponse(BaseModel):
    id: uuid.UUID
    stdid: Optional[str] = None
    name: str
    email: str
    role: str
    branch: Optional[str] = None
    year: Optional[int] = None
    phone: Optional[str] = None
    oauth_provider: Optional[str] = None

    class Config:
        from_attributes = True


class StudentLookupResponse(BaseModel):
    id: uuid.UUID
    stdid: str
    name: str
    email: str

    class Config:
        from_attributes = True


class GoogleCallbackRequest(BaseModel):
    email: str
    name: str
    oauth_id: Optional[str] = None
    oauth_provider: Optional[str] = "google"
    avatar_url: Optional[str] = None


class DevLoginRequest(BaseModel):
    email: str
    name: Optional[str] = None
    role: Optional[str] = "student"
    stdid: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
