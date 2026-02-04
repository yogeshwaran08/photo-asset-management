from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from app.api.v1.endpoints import photos
from app.db.session import get_db
from app.models.test import Test

api_router = APIRouter()
api_router.include_router(photos.router, prefix="/photos", tags=["photos"])

from pydantic import BaseModel

class TestParams(BaseModel):
    a: int
    b: int

@api_router.get("/health", tags=["health"])
def health_check():
    return {"status": "ok", "message": "Server is healthy"}

@api_router.post("/test", tags=["test"])
def test_params(params: TestParams, db: Session = Depends(get_db)):
    sum_value = params.a + params.b
    
    # Save to database
    db_test = Test(a=params.a, b=params.b, sum=sum_value)
    db.add(db_test)
    db.commit()
    db.refresh(db_test)
    
    return {
        "id": db_test.id,
        "a": db_test.a, 
        "b": db_test.b, 
        "sum": db_test.sum
    }
@api_router.get("/sample", tags=["sample"])
def sample():
    return {"status": "ok", "message": "Sample API is working"}
