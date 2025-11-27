from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.contact import Contact
from app.schemas import ContactCreate, ContactResponse
from app.email_service import send_contact_email
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(
    contact_data: ContactCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Submit a contact form message
    
    - **name**: Sender's name (2-100 characters)
    - **email**: Valid email address
    - **subject**: Message subject (3-200 characters)
    - **message**: Message content (10-2000 characters)
    """
    # Create new contact entry
    contact = Contact(
        name=contact_data.name,
        email=contact_data.email,
        phone=contact_data.phone,
        subject=contact_data.subject,
        message=contact_data.message
    )
    
    db.add(contact)
    await db.commit()
    await db.refresh(contact)
    
    # Send email notification (don't fail if email fails)
    try:
        email_sent = await send_contact_email(
            name=contact_data.name,
            email=contact_data.email,
            subject=contact_data.subject,
            message=contact_data.message
        )
        if email_sent:
            logger.info(f"Contact form email sent for submission from {contact_data.email}")
        else:
            logger.warning(f"Email not sent for contact form submission from {contact_data.email}")
    except Exception as e:
        logger.error(f"Error sending contact email: {str(e)}")
    
    return contact


@router.get("/", response_model=list[ContactResponse])
async def get_contacts(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """
    Get all contact submissions (Admin endpoint)
    
    - **skip**: Number of records to skip
    - **limit**: Maximum number of records to return
    """
    result = await db.execute(
        select(Contact).offset(skip).limit(limit).order_by(Contact.created_at.desc())
    )
    contacts = result.scalars().all()
    return contacts


@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(
    contact_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get a specific contact by ID"""
    result = await db.execute(select(Contact).where(Contact.id == contact_id))
    contact = result.scalar_one_or_none()
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with id {contact_id} not found"
        )
    
    return contact
