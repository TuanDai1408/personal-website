from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Contact(Base):
    """Contact form submissions"""
    __tablename__ = "contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Contact {self.name} - {self.email}>"


class Newsletter(Base):
    """Newsletter subscriptions"""
    __tablename__ = "newsletters"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    subscribed_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    is_active = Column(Integer, default=1, nullable=False)  # 1 = active, 0 = unsubscribed
    
    def __repr__(self):
        return f"<Newsletter {self.email}>"
