from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=schemas.SuperAdminSettings)
def create_super_admin_settings(
    settings: schemas.SuperAdminSettingsCreate, 
    db: Session = Depends(get_db)
):
    """Create new super admin settings"""
    # Check if settings already exist (should only be one record)
    existing = db.query(models.SuperAdminSettings).first()
    
    if existing:
        raise HTTPException(
            status_code=400, 
            detail="Super admin settings already exist. Use PUT to update."
        )
    
    db_settings = models.SuperAdminSettings(**settings.model_dump())
    db.add(db_settings)
    db.commit()
    db.refresh(db_settings)
    return db_settings

@router.get("/", response_model=schemas.SuperAdminSettings)
def get_super_admin_settings(db: Session = Depends(get_db)):
    """Get super admin settings (singleton)"""
    settings = db.query(models.SuperAdminSettings).first()
    
    if not settings:
        raise HTTPException(
            status_code=404, 
            detail="Super admin settings not found. Please create settings first."
        )
    
    return settings

@router.put("/", response_model=schemas.SuperAdminSettings)
def update_super_admin_settings(
    settings_update: schemas.SuperAdminSettingsUpdate,
    db: Session = Depends(get_db)
):
    """Update super admin settings"""
    db_settings = db.query(models.SuperAdminSettings).first()
    
    if not db_settings:
        raise HTTPException(
            status_code=404, 
            detail="Super admin settings not found. Please create settings first."
        )
    
    # Update only provided fields
    update_data = settings_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_settings, field, value)
    
    db.commit()
    db.refresh(db_settings)
    return db_settings

@router.delete("/")
def delete_super_admin_settings(db: Session = Depends(get_db)):
    """Delete super admin settings (use with caution)"""
    db_settings = db.query(models.SuperAdminSettings).first()
    
    if not db_settings:
        raise HTTPException(
            status_code=404, 
            detail="Super admin settings not found"
        )
    
    db.delete(db_settings)
    db.commit()
    return {"message": "Super admin settings deleted successfully"}

@router.post("/initialize", response_model=schemas.SuperAdminSettings)
def initialize_super_admin_settings(db: Session = Depends(get_db)):
    """Initialize super admin settings with default values"""
    # Check if already exists
    existing = db.query(models.SuperAdminSettings).first()
    if existing:
        return existing
    
    # Create with defaults
    default_settings = models.SuperAdminSettings(
        platform_name="SnapVault",
        system_domain="app.snapvault.com",
        support_email="admin-support@snapvault.com",
        maintenance_mode=False,
        total_storage_tb=12.4,
        active_regions=4,
        total_assets=8.2,
        image_compression_enabled=True,
        cdn_enabled=True,
        default_currency="USD",
        tax_rate=18.0,
        google_workspace_connected=True,
        aws_rekognition_active=True,
        whatsapp_api_connected=False,
        forced_2fa=True,
        session_timeout_minutes=30,
        auto_approval_enabled=True,
        email_notifications_enabled=True
    )
    
    db.add(default_settings)
    db.commit()
    db.refresh(default_settings)
    return default_settings
