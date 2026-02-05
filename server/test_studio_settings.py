"""
Test script for Studio Settings CRUD API
Run this after the server is running to test the endpoints
"""

import requests
import json

BASE_URL = "http://localhost:8000/api/v1/studio-settings"

def test_create_settings():
    """Test creating studio settings"""
    print("\n=== Testing CREATE Studio Settings ===")
    
    data = {
        "full_name": "Alex Johnson",
        "email": "alex@luminarystudios.com",
        "phone": "+1 (555) 123-4567",
        "job_title": "Owner / Principal Photographer",
        "company_name": "Luminary Studios NY",
        "website_url": "https://luminarystudios.com",
        "business_address": "123 Photography Lane, Creative District, New York, NY 10001",
        "profile_picture_url": None
    }
    
    response = requests.post(BASE_URL + "/", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

def test_get_all_settings():
    """Test getting all studio settings"""
    print("\n=== Testing GET All Studio Settings ===")
    
    response = requests.get(BASE_URL + "/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

def test_get_settings_by_id(settings_id):
    """Test getting specific studio settings"""
    print(f"\n=== Testing GET Studio Settings by ID ({settings_id}) ===")
    
    response = requests.get(f"{BASE_URL}/{settings_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

def test_update_settings(settings_id):
    """Test updating studio settings"""
    print(f"\n=== Testing UPDATE Studio Settings ({settings_id}) ===")
    
    data = {
        "phone": "+1 (555) 999-8888",
        "job_title": "CEO & Lead Photographer"
    }
    
    response = requests.put(f"{BASE_URL}/{settings_id}", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

def test_get_current_user_settings():
    """Test getting current user settings"""
    print("\n=== Testing GET Current User Settings ===")
    
    response = requests.get(f"{BASE_URL}/current/me")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.json()

if __name__ == "__main__":
    print("🚀 Starting Studio Settings API Tests...")
    print(f"Base URL: {BASE_URL}")
    
    try:
        # Create new settings
        created = test_create_settings()
        settings_id = created.get("id")
        
        # Get all settings
        test_get_all_settings()
        
        # Get specific settings
        if settings_id:
            test_get_settings_by_id(settings_id)
            
            # Update settings
            test_update_settings(settings_id)
            
            # Get updated settings
            test_get_settings_by_id(settings_id)
        
        # Get current user settings
        test_get_current_user_settings()
        
        print("\n✅ All tests completed!")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to server. Make sure the server is running at http://localhost:8000")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
