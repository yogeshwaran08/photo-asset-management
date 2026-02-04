from sqlalchemy import Column, Integer, String, Boolean, Float
from app.db.base import Base

class SuperAdminSettings(Base):
    __tablename__ = "super_admin_settings"

    id = Column(Integer, primary_key=True, index=True)
    
    # General / Platform Configuration
    platform_name = Column(String, nullable=False, default="SnapVault")
    system_domain = Column(String, nullable=False)
    support_email = Column(String, nullable=False)
    maintenance_mode = Column(Boolean, default=False)
    
    # Storage & Assets
    total_storage_tb = Column(Float, default=0.0)
    active_regions = Column(Integer, default=4)
    total_assets = Column(Float, default=0.0)  # in millions
    image_compression_enabled = Column(Boolean, default=True)
    cdn_enabled = Column(Boolean, default=True)
    
    # Billing & Monetization
    default_currency = Column(String, default="USD")
    tax_rate = Column(Float, default=18.0)
    stripe_live_key = Column(String, nullable=True)
    
    # Integrations
    google_workspace_connected = Column(Boolean, default=False)
    aws_rekognition_active = Column(Boolean, default=False)
    whatsapp_api_connected = Column(Boolean, default=False)
    
    # Security & Access
    forced_2fa = Column(Boolean, default=True)
    session_timeout_minutes = Column(Integer, default=30)
    auto_approval_enabled = Column(Boolean, default=True)
    
    # Notifications
    email_notifications_enabled = Column(Boolean, default=True)
