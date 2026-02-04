from pydantic import BaseModel, EmailStr
from typing import Optional

class StudioSettingsBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    job_title: Optional[str] = None
    company_name: str
    website_url: Optional[str] = None
    business_address: Optional[str] = None
    profile_picture_url: Optional[str] = None

class StudioSettingsCreate(StudioSettingsBase):
    pass

class StudioSettingsUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    job_title: Optional[str] = None
    company_name: Optional[str] = None
    website_url: Optional[str] = None
    business_address: Optional[str] = None
    profile_picture_url: Optional[str] = None

class StudioSettings(StudioSettingsBase):
    id: int

    class Config:
        from_attributes = True
