from pydantic import BaseModel
from typing import Optional

class SuperAdminSettingsBase(BaseModel):
    # General / Platform Configuration
    platform_name: str = "SnapVault"
    system_domain: str
    support_email: str
    maintenance_mode: bool = False
    
    # Storage & Assets
    total_storage_tb: float = 0.0
    active_regions: int = 4
    total_assets: float = 0.0
    image_compression_enabled: bool = True
    cdn_enabled: bool = True
    
    # Billing & Monetization
    default_currency: str = "USD"
    tax_rate: float = 18.0
    stripe_live_key: Optional[str] = None
    
    # Integrations
    google_workspace_connected: bool = False
    aws_rekognition_active: bool = False
    whatsapp_api_connected: bool = False
    
    # Security & Access
    forced_2fa: bool = True
    session_timeout_minutes: int = 30
    auto_approval_enabled: bool = True
    
    # Notifications
    email_notifications_enabled: bool = True

class SuperAdminSettingsCreate(SuperAdminSettingsBase):
    pass

class SuperAdminSettingsUpdate(BaseModel):
    # All fields optional for partial updates
    platform_name: Optional[str] = None
    system_domain: Optional[str] = None
    support_email: Optional[str] = None
    maintenance_mode: Optional[bool] = None
    
    total_storage_tb: Optional[float] = None
    active_regions: Optional[int] = None
    total_assets: Optional[float] = None
    image_compression_enabled: Optional[bool] = None
    cdn_enabled: Optional[bool] = None
    
    default_currency: Optional[str] = None
    tax_rate: Optional[float] = None
    stripe_live_key: Optional[str] = None
    
    google_workspace_connected: Optional[bool] = None
    aws_rekognition_active: Optional[bool] = None
    whatsapp_api_connected: Optional[bool] = None
    
    forced_2fa: Optional[bool] = None
    session_timeout_minutes: Optional[int] = None
    auto_approval_enabled: Optional[bool] = None
    
    email_notifications_enabled: Optional[bool] = None

class SuperAdminSettings(SuperAdminSettingsBase):
    id: int

    class Config:
        from_attributes = True
