# Quick start script for backend development (Windows)

Write-Host "🚀 Starting Personal Website Backend..." -ForegroundColor Green
Write-Host ""

# Check if virtual environment exists
if (!(Test-Path "venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment
Write-Host "🔧 Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

# Install dependencies
Write-Host "📥 Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Create data directory
if (!(Test-Path "data")) {
    New-Item -ItemType Directory -Path "data" | Out-Null
}

# Run the application
Write-Host "✅ Starting FastAPI server on http://localhost:8000" -ForegroundColor Green
Write-Host "📚 API Docs: http://localhost:8000/api/docs" -ForegroundColor Cyan
Write-Host ""
python -m uvicorn app.main:app --reload --port 8000
