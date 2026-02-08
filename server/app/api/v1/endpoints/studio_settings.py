from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=schemas.StudioSettings)
def create_studio_settings(
    settings: schemas.StudioSettingsCreate, 
    db: Session = Depends(get_db)
):
    """Create new studio settings"""
    # Check if email_id already exists if provided
    if settings.email_id:
        existing = db.query(models.StudioSettings).filter(
            models.StudioSettings.email_id == settings.email_id
        ).first()
        
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    db_settings = models.StudioSettings(**settings.model_dump())
    db.add(db_settings)
    db.commit()
    db.refresh(db_settings)
    return db_settings

@router.get("/", response_model=List[schemas.StudioSettings])
def get_all_studio_settings(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """Get all studio settings (for admin purposes)"""
    settings = db.query(models.StudioSettings).offset(skip).limit(limit).all()
    return settings

@router.get("/current/me", response_model=schemas.StudioSettings)
def get_current_user_settings(db: Session = Depends(get_db)):
    """Get current user's studio settings (placeholder - will need auth)"""
    # For now, return the first settings record
    # In production, this would use the authenticated user's ID
    settings = db.query(models.StudioSettings).first()
    
    if not settings:
        raise HTTPException(
            status_code=404, 
            detail="No settings found. Please create your studio profile first."
        )
    
    return settings

@router.get("/{settings_id}", response_model=schemas.StudioSettings)
def get_studio_settings(settings_id: int, db: Session = Depends(get_db)):
    """Get specific studio settings by ID"""
    settings = db.query(models.StudioSettings).filter(
        models.StudioSettings.id == settings_id
    ).first()
    
    if not settings:
        raise HTTPException(status_code=404, detail="Studio settings not found")
    
    return settings

@router.put("/{settings_id}", response_model=schemas.StudioSettings)
def update_studio_settings(
    settings_id: int,
    settings_update: schemas.StudioSettingsUpdate,
    db: Session = Depends(get_db)
):
    """Update studio settings"""
    db_settings = db.query(models.StudioSettings).filter(
        models.StudioSettings.id == settings_id
    ).first()
    
    if not db_settings:
        raise HTTPException(status_code=404, detail="Studio settings not found")
    
    # Check if email is being updated and if it already exists
    if settings_update.email_id and settings_update.email_id != db_settings.email_id:
        existing = db.query(models.StudioSettings).filter(
            models.StudioSettings.email_id == settings_update.email_id
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already in use")
    
    # Update only provided fields
    update_data = settings_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_settings, field, value)
    
    db.commit()
    db.refresh(db_settings)
    return db_settings

@router.delete("/{settings_id}")
def delete_studio_settings(settings_id: int, db: Session = Depends(get_db)):
    """Delete studio settings"""
    db_settings = db.query(models.StudioSettings).filter(
        models.StudioSettings.id == settings_id
    ).first()
    
    if not db_settings:
        raise HTTPException(status_code=404, detail="Studio settings not found")
    
    db.delete(db_settings)
    db.commit()
    return {"message": "Studio settings deleted successfully"}
