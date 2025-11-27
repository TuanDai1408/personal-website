from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.config import get_settings

settings = get_settings()

# Create async engine with serverless-optimized settings
engine = create_async_engine(
    settings.database_url,
    echo=settings.debug,
    future=True,
    # Serverless optimizations
    pool_pre_ping=True,  # Verify connections before using
    pool_size=1,  # Minimal pool for serverless
    max_overflow=0,  # No overflow for serverless
    pool_recycle=300,  # Recycle connections after 5 minutes
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
