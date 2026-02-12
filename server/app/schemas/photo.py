from pydantic import BaseModel
from typing import Optional

class PhotoBase(BaseModel):
    title: str
    url: str
    file_size: int = 0
    event_id: int
    collection_id: Optional[int] = None

class PhotoCreate(PhotoBase):
    pass

class PhotoUpdate(PhotoBase):
    title: Optional[str] = None
    url: Optional[str] = None
    event_id: Optional[int] = None

class Photo(PhotoBase):
    id: int

    class Config:
        from_attributes = True # updated for Pydantic V2 (was orm_mode=True in V1)
