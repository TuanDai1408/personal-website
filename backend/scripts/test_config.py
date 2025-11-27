import os
import sys
from typing import List

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.config import Settings

def test_config_parsing():
    print("Testing Config Parsing...")

    # Test 1: Default values (List)
    print("\n1. Testing default values...")
    settings = Settings()
    print(f"Type: {type(settings.allowed_origins)}")
    print(f"Value: {settings.allowed_origins}")
    assert isinstance(settings.allowed_origins, list)

    # Test 2: Comma-separated string (Env var simulation)
    print("\n2. Testing comma-separated string...")
    os.environ["ALLOWED_ORIGINS"] = "http://foo.com,http://bar.com"
    # Force reload of settings
    settings = Settings()
    print(f"Type: {type(settings.allowed_origins)}")
    print(f"Value: {settings.allowed_origins}")
    assert isinstance(settings.allowed_origins, list)
    assert "http://foo.com" in settings.allowed_origins

    # Test 3: JSON string (Env var simulation)
    print("\n3. Testing JSON string...")
    os.environ["ALLOWED_ORIGINS"] = '["http://json.com", "http://test.com"]'
    settings = Settings()
    print(f"Type: {type(settings.allowed_origins)}")
    print(f"Value: {settings.allowed_origins}")
    assert isinstance(settings.allowed_origins, list)
    assert "http://json.com" in settings.allowed_origins

    print("\n✅ All config tests passed!")

if __name__ == "__main__":
    try:
        test_config_parsing()
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
