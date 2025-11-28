from pydantic import BaseModel, EmailStr, Field
from datetime import datetime, date
from typing import Optional, List


class ContactCreate(BaseModel):
    """Schema for contact form submission"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str | None = Field(None, max_length=20)
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    """Schema for contact response"""
    id: int
    name: str
    email: str
    phone: str | None
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


# --- User Schemas ---
class UserImageBase(BaseModel):
    image_url: str

class UserImageCreate(UserImageBase):
    pass

class UserImageResponse(UserImageBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "user"
    is_active: bool = True
    full_name: Optional[str] = None
    dob: Optional[date] = None

class UserCreate(UserBase):
    password: str
    images: Optional[List[str]] = [] # List of image URLs

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None
    full_name: Optional[str] = None
    dob: Optional[date] = None
    images: Optional[List[str]] = None

class UserResponse(UserBase):
    id: int
    last_login: Optional[datetime] = None
    created_at: datetime
    images: List[UserImageResponse] = []

    class Config:
        from_attributes = True


# --- Content Schemas ---
class CategoryBase(BaseModel):
    name: str
    slug: str

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True

class PostBase(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    status: str = "draft"
    image_url: Optional[str] = None
    category_id: Optional[int] = None

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    status: Optional[str] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None

class PostResponse(PostBase):
    id: int
    views: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    slug: str
    description: str
    content: Optional[str] = None
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    github_url: Optional[str] = None
    status: str = "completed"

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    github_url: Optional[str] = None
    status: Optional[str] = None

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
