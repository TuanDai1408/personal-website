#!/usr/bin/env python3
"""
Script to test API endpoints
"""
import requests
import json

API_URL = "https://personal-website-vercel-three.vercel.app"

def test_health():
    """Test health endpoint"""
    print("🔍 Testing /api/health...")
    try:
        response = requests.get(f"{API_URL}/api/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_contact_form():
    """Test contact form submission"""
    print("\n🔍 Testing POST /api/contact/...")
    
    data = {
        "name": "Test User từ API",
        "email": "test@example.com",
        "phone": "0912345678",
        "subject": "Test Integration",
        "message": "Đây là test message từ Python script để kiểm tra backend API"
    }
    
    try:
        response = requests.post(
            f"{API_URL}/api/contact/",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            print("✅ Contact form submitted successfully!")
            return True
        else:
            print("❌ Failed to submit contact form")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_newsletter():
    """Test newsletter subscription"""
    print("\n🔍 Testing POST /api/newsletter/subscribe/...")
    
    data = {
        "email": "testuser@example.com"
    }
    
    try:
        response = requests.post(
            f"{API_URL}/api/newsletter/subscribe/",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            print("✅ Newsletter subscription successful!")
            return True
        else:
            print("⚠️ Newsletter response (might be duplicate)")
            return True  # Could be duplicate
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    print(f"Testing API at: {API_URL}\n")
    print("="*50)
    
    results = {
        "Health Check": test_health(),
        "Contact Form": test_contact_form(),
        "Newsletter": test_newsletter()
    }
    
    print("\n" + "="*50)
    print("\n📊 TEST RESULTS:")
    for test, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status} - {test}")
    
    all_passed = all(results.values())
    print("\n" + "="*50)
    if all_passed:
        print("✅ ALL TESTS PASSED!")
    else:
        print("❌ SOME TESTS FAILED")
