import os
import sys

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import Settings

def test_db_url_parsing():
    print("Testing Database URL Parsing...")

    # Test 1: SQLite default
    print("\n1. Testing default SQLite...")
    settings = Settings()
    print(f"Value: {settings.database_url}")
    assert "sqlite+aiosqlite" in settings.database_url

    # Test 2: Postgres without driver (Env var simulation)
    print("\n2. Testing Postgres without driver...")
    os.environ["DATABASE_URL"] = "postgresql://user:pass@host:5432/db"
    # Force reload
    settings = Settings()
    print(f"Value: {settings.database_url}")
    assert "postgresql+asyncpg://" in settings.database_url

    # Test 3: Postgres with driver already present
    print("\n3. Testing Postgres with driver...")
    os.environ["DATABASE_URL"] = "postgresql+asyncpg://user:pass@host:5432/db"
    settings = Settings()
    print(f"Value: {settings.database_url}")
    assert "postgresql+asyncpg://" in settings.database_url

    print("\n✅ All DB URL tests passed!")

if __name__ == "__main__":
    try:
        test_db_url_parsing()
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
