from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class ContactCreate(BaseModel):
    """Schema for contact form submission"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    """Schema for contact response"""
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class NewsletterCreate(BaseModel):
    """Schema for newsletter subscription"""
    email: EmailStr


class NewsletterResponse(BaseModel):
    """Schema for newsletter response"""
    id: int
    email: str
    subscribed_at: datetime
    is_active: int
    
    class Config:
        from_attributes = True


class HealthResponse(BaseModel):
    """Schema for health check response"""
    status: str
    version: str
    database: str
