from pydantic_settings import BaseSettings
from typing import List, Union, Any
from pydantic import field_validator, AnyHttpUrl
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
    allowed_origins: Union[List[str], str] = [
        "http://localhost:4000",
        "http://localhost:3000",
        "https://personal-website-3qr.pages.dev",
        "https://daidataly.online",
        "https://www.daidataly.online",
    ]

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, v: Any) -> List[str]:
        if isinstance(v, str):
            if v.startswith("["):
                import json
                return json.loads(v)
            return [origin.strip() for origin in v.split(",")]
        return v

    model_config = {
        "env_file": ".env",
        "case_sensitive": False,
        "extra": "ignore"
    }
    
    # Email Configuration
    enable_email: bool = False  # Set to True when SMTP is configured
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_user: str = ""  # Your Gmail address
    smtp_password: str = ""  # Gmail App Password (not regular password)
    email_from: str = "Personal Website <noreply@daidataly.online>"
    email_to: str = "trantuandai2508@gmail.com"  # Recipient for contact form
    
    # Security
    api_secret_key: str = "dev-secret-key-change-in-production"
    



@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
