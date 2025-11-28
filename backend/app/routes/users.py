from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List
from passlib.context import CryptContext

from app.database import get_db
from app.models.user import User, UserImage
from app.schemas import UserCreate, UserUpdate, UserResponse

router = APIRouter(prefix="/api/users", tags=["users"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.get("/", response_model=List[UserResponse])
async def get_users(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).options(selectinload(User.images)).offset(skip).limit(limit)
    )
    return result.scalars().all()

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if user exists
    result = await db.execute(select(User).where((User.username == user.username) | (User.email == user.email)))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Username or email already registered")

    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role,
        is_active=user.is_active,
        full_name=user.full_name,
        dob=user.dob
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)

    # Add images
    if user.images:
        for image_url in user.images:
            db_image = UserImage(user_id=db_user.id, image_url=image_url)
            db.add(db_image)
        await db.commit()
        await db.refresh(db_user)
    
    # Reload with images
    result = await db.execute(
        select(User).options(selectinload(User.images)).where(User.id == db_user.id)
    )
    return result.scalar_one()

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).options(selectinload(User.images)).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user_update: UserUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).options(selectinload(User.images)).where(User.id == user_id)
    )
    db_user = result.scalar_one_or_none()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.model_dump(exclude_unset=True)
    
    # Handle password separately
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    
    # Handle images separately
    if "images" in update_data:
        images = update_data.pop("images")
        # Clear existing images (simple replacement strategy)
        # Note: In a real app, you might want to handle add/remove selectively
        for img in db_user.images:
            await db.delete(img)
        
        if images:
            for image_url in images:
                db_image = UserImage(user_id=db_user.id, image_url=image_url)
                db.add(db_image)

    for key, value in update_data.items():
        setattr(db_user, key, value)

    await db.commit()
    await db.refresh(db_user)
    
    # Reload with images
    result = await db.execute(
        select(User).options(selectinload(User.images)).where(User.id == db_user.id)
    )
    return result.scalar_one()

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    await db.delete(user)
    await db.commit()
