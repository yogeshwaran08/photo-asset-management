from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    url = Column(String)
    file_size = Column(Integer, default=0)
    event_id = Column(Integer, ForeignKey("events.id"))
    
    # Relationship
    event = relationship("Event", back_populates="photos")
