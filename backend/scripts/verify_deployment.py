import os
import sys
import json

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def check_requirements():
    print("1. Checking requirements.txt...")
    try:
        with open("backend/requirements.txt", "r") as f:
            reqs = f.read()
            if "uvicorn[standard]" in reqs:
                print("❌ FAIL: 'uvicorn[standard]' found. It should be 'uvicorn' to avoid uvloop issues.")
                return False
            if "uvicorn" not in reqs:
                print("❌ FAIL: 'uvicorn' not found.")
                return False
            if "asyncpg" not in reqs:
                print("❌ FAIL: 'asyncpg' not found.")
                return False
            print("✅ PASS: requirements.txt looks good (no uvloop, has asyncpg).")
            return True
    except FileNotFoundError:
        print("❌ FAIL: backend/requirements.txt not found.")
        return False

def check_vercel_json():
    print("\n2. Checking vercel.json...")
    try:
        with open("backend/vercel.json", "r") as f:
            config = json.load(f)
            if "rewrites" not in config:
                print("❌ FAIL: 'rewrites' not found in vercel.json. Legacy 'routes' might be used.")
                return False
            print("✅ PASS: vercel.json uses rewrites.")
            return True
    except Exception as e:
        print(f"❌ FAIL: Error reading vercel.json: {e}")
        return False

def check_main_py():
    print("\n3. Checking app/main.py (Read-only FS fix)...")
    try:
        with open("backend/app/main.py", "r", encoding="utf-8") as f:
            content = f.read()
            if 'if settings.database_url.startswith("sqlite"):' not in content:
                print("❌ FAIL: SQLite check for 'data' directory creation not found.")
                return False
            print("✅ PASS: app/main.py has SQLite check.")
            return True
    except Exception as e:
        print(f"❌ FAIL: Error reading app/main.py: {e}")
        return False

def check_config_py():
    print("\n4. Checking app/config.py (Validators)...")
    try:
        with open("backend/app/config.py", "r", encoding="utf-8") as f:
            content = f.read()
            if 'def parse_allowed_origins' not in content:
                print("❌ FAIL: parse_allowed_origins validator not found.")
                return False
            if 'def parse_database_url' not in content:
                print("❌ FAIL: parse_database_url validator not found.")
                return False
            print("✅ PASS: app/config.py has necessary validators.")
            return True
    except Exception as e:
        print(f"❌ FAIL: Error reading app/config.py: {e}")
        return False

def check_app_import():
    print("\n5. Checking App Import...")
    try:
        # Set dummy env vars to avoid pydantic errors during import
        os.environ["DATABASE_URL"] = "postgresql://user:pass@localhost:5432/db"
        os.environ["ALLOWED_ORIGINS"] = "http://localhost:3000"
        
        from app.main import app
        print("✅ PASS: Successfully imported app.main.app")
        return True
    except Exception as e:
        print(f"❌ FAIL: Failed to import app: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    print("🔍 Starting Deployment Readiness Verification...\n")
    
    checks = [
        check_requirements(),
        check_vercel_json(),
        check_main_py(),
        check_config_py(),
        check_app_import()
    ]
    
    print("\n" + "="*30)
    if all(checks):
        print("✅ ALL CHECKS PASSED. READY FOR DEPLOYMENT.")
        sys.exit(0)
    else:
        print("❌ SOME CHECKS FAILED. DO NOT DEPLOY.")
        sys.exit(1)

if __name__ == "__main__":
    main()
