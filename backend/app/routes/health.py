from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.database import get_db
from app.schemas import HealthResponse
from app.config import get_settings

router = APIRouter(prefix="/api/health", tags=["health"])
settings = get_settings()


@router.get("/", response_model=HealthResponse)
async def health_check(db: AsyncSession = Depends(get_db)):
    """
    Health check endpoint
    
    Returns API status, version, and database connectivity
    """
    # Check database connection
    db_status = "disconnected"
    try:
        await db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "healthy",
        "version": settings.app_version,
        "database": db_status
    }
