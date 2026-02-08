from pydantic import BaseModel, EmailStr
from typing import Optional

class StudioSettingsBase(BaseModel):
    full_name: Optional[str] = None
    mobile_number: Optional[str] = None
    email_id: Optional[EmailStr] = None
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    
    company_name: Optional[str] = None
    industry: Optional[str] = None
    area: Optional[str] = None
    avg_events_per_year: Optional[str] = None
    
    billing_company_name: Optional[str] = None
    gst_vat_number: Optional[str] = None
    
    profile_picture_url: Optional[str] = None

class StudioSettingsCreate(StudioSettingsBase):
    pass

class StudioSettingsUpdate(StudioSettingsBase):
    pass

class StudioSettings(StudioSettingsBase):
    id: int

    class Config:
        from_attributes = True
