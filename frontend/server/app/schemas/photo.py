from pydantic import BaseModel
from typing import Optional

class PhotoBase(BaseModel):
    title: str
    url: str
    # description: Optional[str] = None

class PhotoCreate(PhotoBase):
    pass

class Photo(PhotoBase):
    id: int

    class Config:
        from_attributes = True # updated for Pydantic V2 (was orm_mode=True in V1)
