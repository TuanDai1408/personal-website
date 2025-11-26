#!/bin/bash
# Quick start script for backend development

echo "🚀 Starting Personal Website Backend..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create data directory
mkdir -p data

# Run the application
echo "✅ Starting FastAPI server on http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/api/docs"
echo ""
uvicorn app.main:app --reload --port 8000
