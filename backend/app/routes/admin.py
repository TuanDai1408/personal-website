from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.database import get_db
from app.models.contact import Contact
from app.schemas import ContactResponse
import os

router = APIRouter(prefix="/api/admin", tags=["admin"])

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    token: str
    message: str

class StatsResponse(BaseModel):
    day: str
    views: int

# Simple in-memory stats for demo purposes
FAKE_STATS = [
    {"day": "Mon", "views": 120},
    {"day": "Tue", "views": 150},
    {"day": "Wed", "views": 180},
    {"day": "Thu", "views": 190},
    {"day": "Fri", "views": 250},
    {"day": "Sat", "views": 300},
    {"day": "Sun", "views": 280},
]

@router.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest):
    admin_user = os.getenv("ADMIN_USER", "admin")
    admin_pass = os.getenv("ADMIN_PASSWORD", "admin123")
    
    if credentials.username == admin_user and credentials.password == admin_pass:
        return {"token": "fake-jwt-token-for-demo", "message": "Login successful"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password"
    )

@router.get("/stats", response_model=List[StatsResponse])
async def get_stats():
    return FAKE_STATS

@router.get("/contacts", response_model=List[ContactResponse])
async def get_contacts(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Contact).offset(skip).limit(limit).order_by(Contact.created_at.desc())
    )
    contacts = result.scalars().all()
    return contacts

@router.delete("/contacts/{contact_id}")
async def delete_contact(
    contact_id: int,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalar_one_or_none()
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with id {contact_id} not found"
        )
    
    await db.delete(contact)
    await db.commit()
    
    return {"message": "Contact deleted successfully"}
