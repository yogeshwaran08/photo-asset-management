from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from app.api.v1.endpoints import photos, studio_settings, super_admin_settings, events, auth
from app.db.session import get_db
from app.models.test import Test

api_router = APIRouter()
api_router.include_router(photos.router, prefix="/photos", tags=["photos"])
api_router.include_router(studio_settings.router, prefix="/studio-settings", tags=["studio-settings"])
api_router.include_router(super_admin_settings.router, prefix="/super-admin-settings", tags=["super-admin-settings"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])

@api_router.get("/health", tags=["health"])
def health_check():
    return {"status": "ok", "message": "Server is healthy"}
