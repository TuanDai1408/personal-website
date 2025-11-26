import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings
import logging

logger = logging.getLogger(__name__)


async def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    """
    Send contact form submission via email
    
    Args:
        name: Name of the person who submitted the form
        email: Email address of the person
        subject: Subject of the message
        message: Message content
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    settings = get_settings()
    
    # Check if email is enabled and configured
    if not settings.enable_email or not settings.smtp_user or not settings.smtp_password:
        logger.warning("Email is not enabled or not configured properly")
        return False
    
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Contact Form: {subject}"
        msg['From'] = settings.email_from
        msg['To'] = settings.email_to
        msg['Reply-To'] = email
        
        # Create HTML content
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }}
                .content {{
                    background-color: white;
                    padding: 30px;
                    border-radius: 0 0 5px 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }}
                .field {{
                    margin-bottom: 20px;
                }}
                .field-label {{
                    font-weight: bold;
                    color: #667eea;
                    margin-bottom: 5px;
                }}
                .field-value {{
                    padding: 10px;
                    background-color: #f5f5f5;
                    border-left: 3px solid #667eea;
                    border-radius: 3px;
                }}
                .message-content {{
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }}
                .footer {{
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    font-size: 12px;
                    color: #999;
                    text-align: center;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📬 New Contact Form Submission</h1>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="field-label">👤 Name:</div>
                        <div class="field-value">{name}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">📧 Email:</div>
                        <div class="field-value"><a href="mailto:{email}">{email}</a></div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">📝 Subject:</div>
                        <div class="field-value">{subject}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">💬 Message:</div>
                        <div class="field-value message-content">{message}</div>
                    </div>
                    
                    <div class="footer">
                        Sent from your personal website contact form
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Create plain text version
        text_content = f"""
        New Contact Form Submission
        ============================
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        
        ---
        Sent from your personal website contact form
        """
        
        # Attach both versions
        part1 = MIMEText(text_content, 'plain')
        part2 = MIMEText(html_content, 'html')
        msg.attach(part1)
        msg.attach(part2)
        
        # Send email
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_host,
            port=settings.smtp_port,
            username=settings.smtp_user,
            password=settings.smtp_password,
            start_tls=True,
        )
        
        logger.info(f"Contact email sent successfully to {settings.email_to}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send contact email: {str(e)}")
        return False
