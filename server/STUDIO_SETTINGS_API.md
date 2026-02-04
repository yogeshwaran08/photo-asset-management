# Studio Settings API Documentation

## Base URL
```
http://localhost:8000/api/v1/studio-settings
```

## Endpoints

### 1. Create Studio Settings
**POST** `/`

Create new studio settings profile.

**Request Body:**
```json
{
  "full_name": "Alex Johnson",
  "email": "alex@luminarystudios.com",
  "phone": "+1 (555) 123-4567",
  "job_title": "Owner / Principal Photographer",
  "company_name": "Luminary Studios NY",
  "website_url": "https://luminarystudios.com",
  "business_address": "123 Photography Lane, Creative District, New York, NY 10001",
  "profile_picture_url": null
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "full_name": "Alex Johnson",
  "email": "alex@luminarystudios.com",
  "phone": "+1 (555) 123-4567",
  "job_title": "Owner / Principal Photographer",
  "company_name": "Luminary Studios NY",
  "website_url": "https://luminarystudios.com",
  "business_address": "123 Photography Lane, Creative District, New York, NY 10001",
  "profile_picture_url": null
}
```

---

### 2. Get All Studio Settings
**GET** `/`

Retrieve all studio settings (for admin purposes).

**Query Parameters:**
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum number of records to return (default: 100)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "full_name": "Alex Johnson",
    "email": "alex@luminarystudios.com",
    ...
  }
]
```

---

### 3. Get Studio Settings by ID
**GET** `/{settings_id}`

Retrieve specific studio settings by ID.

**Path Parameters:**
- `settings_id`: Integer ID of the settings record

**Response:** `200 OK`
```json
{
  "id": 1,
  "full_name": "Alex Johnson",
  "email": "alex@luminarystudios.com",
  ...
}
```

**Error Response:** `404 Not Found`
```json
{
  "detail": "Studio settings not found"
}
```

---

### 4. Update Studio Settings
**PUT** `/{settings_id}`

Update existing studio settings. Only provided fields will be updated.

**Path Parameters:**
- `settings_id`: Integer ID of the settings record

**Request Body (all fields optional):**
```json
{
  "full_name": "Alex Johnson",
  "email": "newemail@example.com",
  "phone": "+1 (555) 999-8888",
  "job_title": "CEO & Lead Photographer",
  "company_name": "Luminary Studios NY",
  "website_url": "https://newwebsite.com",
  "business_address": "New Address",
  "profile_picture_url": "https://example.com/photo.jpg"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "full_name": "Alex Johnson",
  "email": "newemail@example.com",
  ...
}
```

**Error Responses:**
- `404 Not Found`: Settings not found
- `400 Bad Request`: Email already in use

---

### 5. Delete Studio Settings
**DELETE** `/{settings_id}`

Delete studio settings record.

**Path Parameters:**
- `settings_id`: Integer ID of the settings record

**Response:** `200 OK`
```json
{
  "message": "Studio settings deleted successfully"
}
```

**Error Response:** `404 Not Found`

---

### 6. Get Current User Settings
**GET** `/current/me`

Get the current authenticated user's studio settings.

> **Note:** Currently returns the first settings record. In production, this would use authentication to return the logged-in user's settings.

**Response:** `200 OK`
```json
{
  "id": 1,
  "full_name": "Alex Johnson",
  "email": "alex@luminarystudios.com",
  ...
}
```

**Error Response:** `404 Not Found`
```json
{
  "detail": "No settings found. Please create your studio profile first."
}
```

---

## Frontend Integration Example

```typescript
// Create settings
const createSettings = async (data: StudioSettingsCreate) => {
  const response = await fetch('http://localhost:8000/api/v1/studio-settings/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

// Get current user settings
const getCurrentSettings = async () => {
  const response = await fetch('http://localhost:8000/api/v1/studio-settings/current/me');
  return response.json();
};

// Update settings
const updateSettings = async (id: number, data: Partial<StudioSettingsUpdate>) => {
  const response = await fetch(`http://localhost:8000/api/v1/studio-settings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};
```

---

## Database Schema

**Table:** `studio_settings`

| Column | Type | Constraints |
|--------|------|-------------|
| id | Integer | Primary Key, Auto-increment |
| profile_picture_url | String | Nullable |
| full_name | String | Not Null |
| email | String | Not Null, Unique, Indexed |
| phone | String | Nullable |
| job_title | String | Nullable |
| company_name | String | Not Null |
| website_url | String | Nullable |
| business_address | Text | Nullable |

---

## Testing with cURL

```bash
# Create settings
curl -X POST "http://localhost:8000/api/v1/studio-settings/" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Alex Johnson",
    "email": "alex@luminarystudios.com",
    "phone": "+1 (555) 123-4567",
    "job_title": "Owner / Principal Photographer",
    "company_name": "Luminary Studios NY",
    "website_url": "https://luminarystudios.com",
    "business_address": "123 Photography Lane, Creative District, New York, NY 10001"
  }'

# Get current user settings
curl "http://localhost:8000/api/v1/studio-settings/current/me"

# Update settings
curl -X PUT "http://localhost:8000/api/v1/studio-settings/1" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1 (555) 999-8888",
    "job_title": "CEO & Lead Photographer"
  }'
```

---

## Next Steps

1. **Add Authentication**: Implement JWT or session-based authentication
2. **Add File Upload**: Implement profile picture upload functionality
3. **Add Validation**: Add more robust validation rules
4. **Add Timestamps**: Add created_at and updated_at fields
5. **Add Soft Delete**: Implement soft delete instead of hard delete
