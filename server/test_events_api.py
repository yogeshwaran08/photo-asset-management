import requests
import json

BASE_URL = "http://127.0.0.1:8000/api/v1/events"

def test_api():
    print("Testing Events API...")
    
    # 1. Create an event
    event_data = {
        "name": "Test Wedding",
        "start_date": "2026-06-01",
        "end_date": "2026-06-02",
        "event_type": "wedding",
        "location": "New York",
        "description": "A beautiful test wedding",
        "template_id": "tpl_1",
        "status": "unpublished"
    }
    
    print(f"Creating event: {event_data['name']}...")
    response = requests.post(f"{BASE_URL}/", json=event_data)
    if response.status_code == 200:
        event = response.json()
        print(f"SUCCESS: Event created with ID: {event['id']}")
        
        # 2. List events
        print("Listing events...")
        list_response = requests.get(f"{BASE_URL}/")
        if list_response.status_code == 200:
            events = list_response.json()
            print(f"SUCCESS: Found {len(events)} events")
            
            # 3. Get event by ID
            event_id = event['id']
            print(f"Getting event {event_id}...")
            get_response = requests.get(f"{BASE_URL}/{event_id}")
            if get_response.status_code == 200:
                print(f"SUCCESS: Retrieved event {event_id}")
                
                # 4. Clean up (Delete)
                print(f"Deleting event {event_id}...")
                del_response = requests.delete(f"{BASE_URL}/{event_id}")
                if del_response.status_code == 200:
                    print(f"SUCCESS: Event {event_id} deleted")
                else:
                    print(f"FAIL: Could not delete event. Status: {del_response.status_code}")
            else:
                print(f"FAIL: Could not get event. Status: {get_response.status_code}")
        else:
            print(f"FAIL: Could not list events. Status: {list_response.status_code}")
    else:
        print(f"FAIL: Could not create event. Status: {response.status_code}")
        print(f"Error: {response.text}")

if __name__ == "__main__":
    test_api()
