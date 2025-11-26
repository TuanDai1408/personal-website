from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings from environment variables"""
    
    # App Info
    app_name: str = "Personal Website API"
    app_version: str = "1.0.0"
    debug: bool = True
    environment: str = "development"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./data/app.db"
    
    # CORS
    frontend_url: str = "http://localhost:4000"
    allowed_origins: List[str] = [
        "http://localhost:4000",
        "http://localhost:3000",
        "https://personal-website-3qr.pages.dev",
        "https://daidataly.online",
        "https://www.daidataly.online",
    ]
    
    # Email (Optional)
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    email_from: str = "noreply@yourdomain.com"
    
    # Security
    api_secret_key: str = "dev-secret-key-change-in-production"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
