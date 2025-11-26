# Personal Website Backend

Backend API for Personal Website built with FastAPI and Python.

## 📋 Features

- ✅ Contact form submission API
- ✅ Newsletter subscription management
- ✅ Health check endpoint
- ✅ SQLite database with async support
- ✅ CORS configuration for frontend integration
- ✅ Docker support for easy deployment
- ✅ Cloudflare Tunnel integration

## 🚀 Quick Start

### Local Development

1. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
uvicorn app.main:app --reload --port 8000
```

4. **Access the API**
- API: http://localhost:8000
- Docs: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

### Docker Deployment

1. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

2. **View logs**
```bash
docker-compose logs -f backend
```

3. **Stop services**
```bash
docker-compose down
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check API status and database connectivity

### Contact Form
- `POST /api/contact/` - Submit contact form
- `GET /api/contact/` - Get all contacts (Admin)
- `GET /api/contact/{id}` - Get specific contact (Admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe/{email}` - Unsubscribe
- `GET /api/newsletter/subscribers` - Get all subscribers (Admin)

## 🔧 Configuration

Environment variables (create `.env` file):

```env
# Application
APP_NAME="Personal Website API"
DEBUG=True
ENVIRONMENT=development

# Server
HOST=0.0.0.0
PORT=8000

# Database
DATABASE_URL=sqlite+aiosqlite:///./data/app.db

# CORS
FRONTEND_URL=http://localhost:4000
ALLOWED_ORIGINS=http://localhost:4000,https://your-domain.pages.dev
```

## 🌐 Cloudflare Tunnel Deployment

### Setup Cloudflare Tunnel

1. **Install cloudflared**
```bash
# Windows
winget install --id Cloudflare.cloudflared

# Mac
brew install cloudflared

# Linux
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

2. **Login to Cloudflare**
```bash
cloudflared tunnel login
```

3. **Create a tunnel**
```bash
cloudflared tunnel create personal-website-backend
```

4. **Configure the tunnel**
Create `cloudflared-config.yml`:
```yaml
tunnel: <TUNNEL_ID>
credentials-file: /path/to/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: api.your-domain.com
    service: http://localhost:8000
  - service: http_status:404
```

5. **Add DNS record**
```bash
cloudflared tunnel route dns personal-website-backend api.your-domain.com
```

6. **Run the tunnel**
```bash
cloudflared tunnel run personal-website-backend
```

### Using Docker Compose with Cloudflare Tunnel

1. **Get tunnel token** from Cloudflare Zero Trust dashboard

2. **Update `.env.docker`**
```env
CLOUDFLARE_TUNNEL_TOKEN=your-tunnel-token-here
```

3. **Run with Docker Compose**
```bash
docker-compose --env-file .env.docker up -d
```

Your API will be accessible at `https://api.your-domain.com`

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── config.py            # Configuration
│   ├── database.py          # Database setup
│   ├── schemas.py           # Pydantic schemas
│   ├── models/              # SQLAlchemy models
│   │   ├── __init__.py
│   │   └── contact.py
│   └── routes/              # API routes
│       ├── __init__.py
│       ├── contact.py
│       ├── newsletter.py
│       └── health.py
├── data/                    # SQLite database (created automatically)
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🧪 Testing

Test the API using curl:

```bash
# Health check
curl http://localhost:8000/api/health

# Submit contact form
curl -X POST http://localhost:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'

# Subscribe to newsletter
curl -X POST http://localhost:8000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

## 📝 Database

The application uses SQLite by default. Database file is created at `data/app.db`.

To upgrade to PostgreSQL, update `DATABASE_URL` in `.env`:
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname
```

And install additional dependencies:
```bash
pip install asyncpg
```

## 🔐 Security Notes

- Change `API_SECRET_KEY` in production
- Use environment-specific CORS origins
- Disable debug mode in production
- Consider adding authentication for admin endpoints
- Use HTTPS in production

## 📄 License

MIT License
