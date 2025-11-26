from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from app.database import get_db
from app.models.contact import Newsletter
from app.schemas import NewsletterCreate, NewsletterResponse

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


@router.post("/subscribe", response_model=NewsletterResponse, status_code=status.HTTP_201_CREATED)
async def subscribe_newsletter(
    newsletter_data: NewsletterCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Subscribe to newsletter
    
    - **email**: Valid email address
    """
    # Check if email already exists
    result = await db.execute(
        select(Newsletter).where(Newsletter.email == newsletter_data.email)
    )
    existing = result.scalar_one_or_none()
    
    if existing:
        if existing.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is already subscribed to newsletter"
            )
        else:
            # Reactivate subscription
            existing.is_active = 1
            await db.commit()
            await db.refresh(existing)
            return existing
    
    # Create new subscription
    newsletter = Newsletter(
        email=newsletter_data.email,
        is_active=1
    )
    
    try:
        db.add(newsletter)
        await db.commit()
        await db.refresh(newsletter)
        return newsletter
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )


@router.post("/unsubscribe/{email}", status_code=status.HTTP_200_OK)
async def unsubscribe_newsletter(
    email: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Unsubscribe from newsletter
    
    - **email**: Email to unsubscribe
    """
    result = await db.execute(
        select(Newsletter).where(Newsletter.email == email)
    )
    newsletter = result.scalar_one_or_none()
    
    if not newsletter:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found in newsletter list"
        )
    
    newsletter.is_active = 0
    await db.commit()
    
    return {"message": "Successfully unsubscribed from newsletter"}


@router.get("/subscribers", response_model=list[NewsletterResponse])
async def get_subscribers(
    skip: int = 0,
    limit: int = 100,
    active_only: bool = True,
    db: AsyncSession = Depends(get_db)
):
    """
    Get all newsletter subscribers (Admin endpoint)
    
    - **skip**: Number of records to skip
    - **limit**: Maximum number of records to return
    - **active_only**: Filter only active subscriptions
    """
    query = select(Newsletter).offset(skip).limit(limit).order_by(Newsletter.subscribed_at.desc())
    
    if active_only:
        query = query.where(Newsletter.is_active == 1)
    
    result = await db.execute(query)
    subscribers = result.scalars().all()
    return subscribers
