from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    url = Column(String)
#    description = Column(String, nullable=True) # Example optional field
