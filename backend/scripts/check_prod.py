import requests
import json

try:
    print("Testing Health...")
    r = requests.get("https://personal-website-vercel-three.vercel.app/api/health")
    print(f"Health Status: {r.status_code}")
    print(f"Health Content: {r.text}")

    print("\nTesting Admin Login...")
    r = requests.post(
        "https://personal-website-vercel-three.vercel.app/api/admin/login",
        json={"username": "admin", "password": "admin123"}
    )
    print(f"Login Status: {r.status_code}")
    print(f"Login Content: {r.text}")
except Exception as e:
    print(f"Error: {e}")
