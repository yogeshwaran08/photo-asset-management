from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class EventBase(BaseModel):
    name: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    event_type: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    template_id: Optional[str] = None
    status: Optional[str] = "unpublished"

class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    name: Optional[str] = None

class Event(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
