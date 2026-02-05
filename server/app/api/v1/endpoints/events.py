from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.db.session import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Event])
def read_events(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve events.
    """
    events = db.query(models.Event).offset(skip).limit(limit).all()
    return events

@router.post("/", response_model=schemas.Event)
def create_event(
    *,
    db: Session = Depends(get_db),
    event_in: schemas.EventCreate,
) -> Any:
    """
    Create new event.
    """
    db_obj = models.Event(
        name=event_in.name,
        start_date=event_in.start_date,
        end_date=event_in.end_date,
        event_type=event_in.event_type,
        location=event_in.location,
        description=event_in.description,
        template_id=event_in.template_id,
        status=event_in.status,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/{id}", response_model=schemas.Event)
def read_event(
    *,
    db: Session = Depends(get_db),
    id: int,
) -> Any:
    """
    Get event by ID.
    """
    event = db.query(models.Event).filter(models.Event.id == id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.put("/{id}", response_model=schemas.Event)
def update_event(
    *,
    db: Session = Depends(get_db),
    id: int,
    event_in: schemas.EventUpdate,
) -> Any:
    """
    Update an event.
    """
    event = db.query(models.Event).filter(models.Event.id == id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    update_data = event_in.model_dump(exclude_unset=True)
    for field in update_data:
        setattr(event, field, update_data[field])
    
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

@router.delete("/{id}", response_model=schemas.Event)
def delete_event(
    *,
    db: Session = Depends(get_db),
    id: int,
) -> Any:
    """
    Delete an event.
    """
    event = db.query(models.Event).filter(models.Event.id == id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(event)
    db.commit()
    return event
