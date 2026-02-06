import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/v1"

def test_event_photos():
    print("Testing Event Photos functionality...")
    
    # 1. Create an event
    event_data = {
        "name": "Photo Test Event",
        "status": "published"
    }
    response = requests.post(f"{BASE_URL}/events/", json=event_data)
    print(f"Response status: {response.status_code}")
    print(f"Response text: {response.text}")
    if response.status_code != 200:
        return
    event = response.json()
    event_id = event['id']
    print(f"Created event ID: {event_id}")

    # 2. Upload a photo to this event
    photo_data = {
        "title": "Beautiful Shot",
        "url": "https://example.com/photo1.jpg",
        "event_id": event_id
    }
    photo_response = requests.post(f"{BASE_URL}/events/{event_id}/photos", json=photo_data)
    if photo_response.status_code == 200:
        print("SUCCESS: Photo uploaded to event")
    else:
        print(f"FAIL: Photo upload failed: {photo_response.text}")

    # 3. Fetch photos for this event
    get_photos_response = requests.get(f"{BASE_URL}/events/{event_id}/photos")
    photos = get_photos_response.json()
    print(f"SUCCESS: Found {len(photos)} photo(s) in event {event_id}")

    # 4. Clean up
    requests.delete(f"{BASE_URL}/events/{event_id}")
    print(f"Cleaned up event {event_id}")

if __name__ == "__main__":
    test_event_photos()
