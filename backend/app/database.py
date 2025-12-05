from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool
from app.config import get_settings

settings = get_settings()

# Create async engine with NullPool (no pooling for serverless)
engine = create_async_engine(
    settings.database_url,
    echo=settings.debug,
    future=True,
    poolclass=NullPool,  # Disable connection pooling for Lambda
)

# Create session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)


class Base(DeclarativeBase):
    """Base class for all database models"""
    pass

# Import models here to ensure they are registered with Base.metadata
from app.models.contact import Contact, Newsletter
from app.models.user import User
from app.models.content import Category, Post, Project


async def get_db():
    """Dependency for getting database session"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def init_db():
    """Initialize database tables (non-blocking for serverless)"""
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        # In serverless, table creation might fail or timeout
        # Log the error but don't crash the app
        print(f"⚠️ Database initialization skipped: {e}")
        print("Tables will be created on first use if needed.")
