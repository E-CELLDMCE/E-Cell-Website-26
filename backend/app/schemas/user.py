import uuid
from typing import Optional, Union
from pydantic import BaseModel, Field, field_validator


class UserProfileUpdate(BaseModel):
    stdid: str = Field(..., min_length=11, max_length=11, description="Student ID number, exactly 11 characters")
    phone: Optional[str] = Field(None, max_length=10, description="Contact phone number, exactly 10 digits")
    branch: Optional[str] = Field(None, max_length=100, description="College branch e.g. Computer Science")
    year: Optional[Union[int, str]] = Field(None, description="Year of study e.g. 1, 2, 3, 4")
    division: Optional[str] = Field(None, max_length=50, description="Student division e.g. A, B")
    roll_number: Optional[str] = Field(None, max_length=50, description="Student roll number e.g. 42", alias="rollNumber")

    model_config = {
        "populate_by_name": True,
    }

    @field_validator("stdid")
    @classmethod
    def validate_stdid(cls, v: str) -> str:
        v = v.strip()
        if len(v) != 11:
            raise ValueError("Student ID must be exactly 11 characters")
        return v

    @field_validator("phone", mode="before")
    @classmethod
    def validate_phone(cls, v):
        if v is None or v == "":
            return None
        v = v.strip()
        if not v.isdigit() or len(v) != 10:
            raise ValueError("Phone number must be exactly 10 digits")
        return v

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
    division: Optional[str] = None
    roll_number: Optional[str] = None
    phone: Optional[str] = None
    oauth_provider: Optional[str] = None

    class Config:
        from_attributes = True


class StudentLookupResponse(BaseModel):
    id: uuid.UUID
    stdid: str
    name: str
    email: str
    division: Optional[str] = None
    roll_number: Optional[str] = None

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


class AdminLoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
