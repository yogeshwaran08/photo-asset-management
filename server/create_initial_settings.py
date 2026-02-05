"""
Quick script to create initial studio settings
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/v1/studio-settings"

# Initial settings data
initial_data = {
    "full_name": "Alex Johnson",
    "email": "alex@luminarystudios.com",
    "phone": "+1 (555) 123-4567",
    "job_title": "Owner / Principal Photographer",
    "company_name": "Luminary Studios NY",
    "website_url": "https://luminarystudios.com",
    "business_address": "123 Photography Lane, Creative District, New York, NY 10001"
}

try:
    print("Creating initial studio settings...")
    response = requests.post(f"{BASE_URL}/", json=initial_data)
    
    if response.status_code == 200:
        print("✅ Success! Settings created:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"❌ Error {response.status_code}:")
        print(response.json())
        
except requests.exceptions.ConnectionError:
    print("❌ Error: Could not connect to server. Make sure it's running at http://localhost:8000")
except Exception as e:
    print(f"❌ Error: {str(e)}")
