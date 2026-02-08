from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base

class StudioSettings(Base):
    __tablename__ = "studio_settings"

    id = Column(Integer, primary_key=True, index=True)
    
    # Personal Details
    full_name = Column(String, nullable=True)
    mobile_number = Column(String, nullable=True)
    email_id = Column(String, nullable=True)
    country = Column(String, nullable=True)
    state = Column(String, nullable=True)
    city = Column(String, nullable=True)
    
    # Company Details
    company_name = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    area = Column(String, nullable=True)
    avg_events_per_year = Column(String, nullable=True)
    
    # Billing Details
    billing_company_name = Column(String, nullable=True)
    gst_vat_number = Column(String, nullable=True)
    
    # Legacy fields (kept for now or removed if clean slate? assuming simple update)
    # profile_picture_url is ok to keep or ignore
    profile_picture_url = Column(String, nullable=True)
