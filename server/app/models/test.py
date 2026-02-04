from sqlalchemy import Column, Integer
from app.db.base import Base

class Test(Base):
    __tablename__ = "test"

    id = Column(Integer, primary_key=True, index=True)
    a = Column(Integer)
    b = Column(Integer)
    sum = Column(Integer)
