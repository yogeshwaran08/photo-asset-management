from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CollectionBase(BaseModel):
    name: str
    event_id: int

class CollectionCreate(CollectionBase):
    pass

class CollectionUpdate(BaseModel):
    name: Optional[str] = None

class Collection(CollectionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
