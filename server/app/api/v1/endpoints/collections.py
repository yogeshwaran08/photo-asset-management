from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app import models, schemas
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Collection)
def create_collection(
    *,
    db: Session = Depends(get_db),
    collection_in: schemas.CollectionCreate,
) -> Any:
    """
    Create new collection.
    """
    # Verify event exists
    event = db.query(models.Event).filter(models.Event.id == collection_in.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    db_obj = models.Collection(
        name=collection_in.name,
        event_id=collection_in.event_id
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[schemas.Collection])
def read_collections(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    event_id: Optional[int] = None,
) -> Any:
    """
    Retrieve collections.
    """
    query = db.query(models.Collection)
    if event_id:
        query = query.filter(models.Collection.event_id == event_id)
    collections = query.offset(skip).limit(limit).all()
    return collections

@router.get("/{id}", response_model=schemas.Collection)
def read_collection(
    *,
    db: Session = Depends(get_db),
    id: int,
) -> Any:
    """
    Get collection by ID.
    """
    collection = db.query(models.Collection).filter(models.Collection.id == id).first()
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    return collection

@router.put("/{id}", response_model=schemas.Collection)
def update_collection(
    *,
    db: Session = Depends(get_db),
    id: int,
    collection_in: schemas.CollectionUpdate,
) -> Any:
    """
    Update a collection.
    """
    collection = db.query(models.Collection).filter(models.Collection.id == id).first()
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    
    update_data = collection_in.model_dump(exclude_unset=True)
    for field in update_data:
        setattr(collection, field, update_data[field])
    
    db.add(collection)
    db.commit()
    db.refresh(collection)
    return collection

@router.delete("/{id}", response_model=schemas.Collection)
def delete_collection(
    *,
    db: Session = Depends(get_db),
    id: int,
) -> Any:
    """
    Delete a collection.
    """
    collection = db.query(models.Collection).filter(models.Collection.id == id).first()
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    db.delete(collection)
    db.commit()
    return collection
