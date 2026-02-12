from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.db.base import Base
import datetime

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    event_type = Column(String, nullable=True) # Wedding, Corporate, etc.
    location = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    template_id = Column(String, nullable=True)
    
    # Status of the event: 'draft', 'published', 'unpublished', 'expired'
    status = Column(String, default="unpublished")
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    photos = relationship("Photo", back_populates="event", cascade="all, delete-orphan")
    collections = relationship("Collection", back_populates="event", cascade="all, delete-orphan")
