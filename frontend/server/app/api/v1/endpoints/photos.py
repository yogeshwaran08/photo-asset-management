from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models, schemas
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Photo)
def create_photo(photo: schemas.PhotoCreate, db: Session = Depends(get_db)):
    # Note: In a real app, you might want to separate this logic into a CRUD service (app/crud/crud_photo.py)
    db_photo = models.Photo(title=photo.title, url=photo.url)
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return db_photo

@router.get("/", response_model=List[schemas.Photo])
def read_photos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    photos = db.query(models.Photo).offset(skip).limit(limit).all()
    return photos
