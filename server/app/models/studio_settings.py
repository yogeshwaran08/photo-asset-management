from sqlalchemy import Column, Integer, String, Text
from app.db.base import Base

class StudioSettings(Base):
    __tablename__ = "studio_settings"

    id = Column(Integer, primary_key=True, index=True)
    
    # Profile Picture
    profile_picture_url = Column(String, nullable=True)
    
    # Personal Details
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    job_title = Column(String, nullable=True)
    
    # Company Details
    company_name = Column(String, nullable=False)
    website_url = Column(String, nullable=True)
    business_address = Column(Text, nullable=True)
