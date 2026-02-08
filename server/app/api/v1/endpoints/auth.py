from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from pydantic import ValidationError

from app import models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings

router = APIRouter()

@router.post("/login", response_model=schemas.Token)
def login(
    response: Response,
    user_in: schemas.UserLogin,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if not user or not security.verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, expires_delta=access_token_expires
    )
    
    refresh_token = security.create_refresh_token(user.id)
    
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        samesite="lax",
        secure=False 
    )

    return {
        "accessToken": access_token,
        "token_type": "bearer",
    }

@router.post("/register", response_model=schemas.Token)
def register(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    response: Response
) -> Any:
    """
    Create new user without the need to be logged in
    """
    user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = models.User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        full_name=user_in.full_name,
        is_active=True,
        role="studio"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    access_token = security.create_access_token(user.id)
    refresh_token = security.create_refresh_token(user.id)
     
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        samesite="lax",
        secure=False 
    )
    
    return {
        "accessToken": access_token,
        "token_type": "bearer",
    }

@router.post("/super-admin/register", response_model=schemas.Token)
def register_super_admin(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    response: Response
) -> Any:
    """
    Create new super admin user
    """
    user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = models.User(
        email=user_in.email,
        hashed_password=security.get_password_hash(user_in.password),
        full_name=user_in.full_name,
        is_active=True,
        is_superuser=True,
        role="admin"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    access_token = security.create_access_token(user.id)
    refresh_token = security.create_refresh_token(user.id)
     
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        samesite="lax",
        secure=False 
    )
    
    return {
        "accessToken": access_token,
        "token_type": "bearer",
    }

@router.post("/refresh", response_model=schemas.Token)
def refresh_token(
    request: Request,
    response: Response,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Refresh access token
    """
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing",
        )
    try:
        payload = jwt.decode(
            refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    if token_data.type != "refresh":
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token type",
        )
        
    user = db.query(models.User).filter(models.User.id == int(token_data.sub)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, expires_delta=access_token_expires
    )
    
    return {
        "accessToken": access_token,
        "token_type": "bearer",
    }

@router.post("/logout")
def logout(response: Response) -> Any:
    """
    Logout user
    """
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

@router.get("/me", response_model=schemas.User)
def read_users_me(
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Get current user
    """
    return current_user
