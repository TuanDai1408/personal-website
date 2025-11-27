from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from app.config import get_settings
from app.database import init_db
from app.routes import contact, newsletter, health, admin

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting up application...")
    
    # Create data directory only for SQLite (local development)
    if settings.database_url.startswith("sqlite"):
        os.makedirs("data", exist_ok=True)
        # Initialize database tables for SQLite
        await init_db()
        print("✅ Database initialized (SQLite)")
    else:
        # For PostgreSQL (production), skip init_db during startup
        # Tables should already exist in Supabase
        print("✅ Using PostgreSQL - skipping table creation")
    
    yield
    
    # Shutdown
    print("🔴 Shutting down application...")


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for Personal Website",
    lifespan=lifespan,
    docs_url="/api/docs" if settings.debug else None,
    redoc_url="/api/redoc" if settings.debug else None,
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(health.router)
app.include_router(contact.router)
app.include_router(newsletter.router)
app.include_router(admin.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Personal Website API",
        "version": settings.app_version,
        "docs": f"/api/docs" if settings.debug else "Documentation disabled in production"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
