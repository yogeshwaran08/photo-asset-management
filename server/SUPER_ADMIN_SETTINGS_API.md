# Super Admin Settings API Documentation

## Base URL
```
http://localhost:8000/api/v1/super-admin-settings
```

---

## Database Schema

**Table:** `super_admin_settings`

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| **id** | Integer | Auto | Primary Key |
| **platform_name** | String | "SnapVault" | Platform display name |
| **system_domain** | String | Required | Main domain (e.g., app.snapvault.com) |
| **support_email** | String | Required | Admin support email |
| **maintenance_mode** | Boolean | False | Enable/disable maintenance mode |
| **total_storage_tb** | Float | 0.0 | Total storage in terabytes |
| **active_regions** | Integer | 4 | Number of active regions |
| **total_assets** | Float | 0.0 | Total assets in millions |
| **image_compression_enabled** | Boolean | True | Auto image compression |
| **cdn_enabled** | Boolean | True | CDN delivery enabled |
| **default_currency** | String | "USD" | Default currency code |
| **tax_rate** | Float | 18.0 | Tax rate percentage |
| **stripe_live_key** | String | Nullable | Stripe API key |
| **google_workspace_connected** | Boolean | False | Google Workspace integration |
| **aws_rekognition_active** | Boolean | False | AWS Rekognition status |
| **whatsapp_api_connected** | Boolean | False | WhatsApp API status |
| **forced_2fa** | Boolean | True | Require 2FA for all users |
| **session_timeout_minutes** | Integer | 30 | Session timeout duration |
| **auto_approval_enabled** | Boolean | True | Auto-approve new studios |
| **email_notifications_enabled** | Boolean | True | Email notifications enabled |

---

## API Endpoints

### 1. Initialize Settings (First Time Setup)
**POST** `/initialize`

Creates settings with default values if they don't exist. Returns existing settings if already initialized.

**Request:** No body required

**Response:** `200 OK`
```json
{
  "id": 1,
  "platform_name": "SnapVault",
  "system_domain": "app.snapvault.com",
  "support_email": "admin-support@snapvault.com",
  "maintenance_mode": false,
  "total_storage_tb": 12.4,
  "active_regions": 4,
  "total_assets": 8.2,
  "image_compression_enabled": true,
  "cdn_enabled": true,
  "default_currency": "USD",
  "tax_rate": 18.0,
  "stripe_live_key": null,
  "google_workspace_connected": true,
  "aws_rekognition_active": true,
  "whatsapp_api_connected": false,
  "forced_2fa": true,
  "session_timeout_minutes": 30,
  "auto_approval_enabled": true,
  "email_notifications_enabled": true
}
```

---

### 2. Get Settings
**GET** `/`

Retrieve the current super admin settings (singleton pattern - only one record exists).

**Response:** `200 OK`
```json
{
  "id": 1,
  "platform_name": "SnapVault",
  "system_domain": "app.snapvault.com",
  ...
}
```

**Error Response:** `404 Not Found`
```json
{
  "detail": "Super admin settings not found. Please create settings first."
}
```

---

### 3. Update Settings
**PUT** `/`

Update settings. Only provided fields will be updated (partial update supported).

**Request Body (all fields optional):**
```json
{
  "platform_name": "MyPlatform",
  "maintenance_mode": true,
  "tax_rate": 20.0,
  "forced_2fa": false,
  "session_timeout_minutes": 60
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "platform_name": "MyPlatform",
  "maintenance_mode": true,
  ...
}
```

---

### 4. Create Settings (Manual)
**POST** `/`

Manually create settings (use `/initialize` instead for first-time setup).

**Request Body:**
```json
{
  "platform_name": "SnapVault",
  "system_domain": "app.snapvault.com",
  "support_email": "admin@example.com",
  "maintenance_mode": false,
  "total_storage_tb": 12.4,
  "active_regions": 4,
  "total_assets": 8.2,
  "image_compression_enabled": true,
  "cdn_enabled": true,
  "default_currency": "USD",
  "tax_rate": 18.0,
  "google_workspace_connected": true,
  "aws_rekognition_active": true,
  "whatsapp_api_connected": false,
  "forced_2fa": true,
  "session_timeout_minutes": 30,
  "auto_approval_enabled": true,
  "email_notifications_enabled": true
}
```

**Error Response:** `400 Bad Request`
```json
{
  "detail": "Super admin settings already exist. Use PUT to update."
}
```

---

### 5. Delete Settings
**DELETE** `/`

Delete settings (use with caution - for testing only).

**Response:** `200 OK`
```json
{
  "message": "Super admin settings deleted successfully"
}
```

---

## Frontend Integration

### TypeScript Interface

```typescript
interface SuperAdminSettings {
  id: number;
  // General / Platform Configuration
  platform_name: string;
  system_domain: string;
  support_email: string;
  maintenance_mode: boolean;
  
  // Storage & Assets
  total_storage_tb: number;
  active_regions: number;
  total_assets: number;
  image_compression_enabled: boolean;
  cdn_enabled: boolean;
  
  // Billing & Monetization
  default_currency: string;
  tax_rate: number;
  stripe_live_key?: string | null;
  
  // Integrations
  google_workspace_connected: boolean;
  aws_rekognition_active: boolean;
  whatsapp_api_connected: boolean;
  
  // Security & Access
  forced_2fa: boolean;
  session_timeout_minutes: number;
  auto_approval_enabled: boolean;
  
  // Notifications
  email_notifications_enabled: boolean;
}
```

### React Hook Example

```typescript
import { useState, useEffect } from 'react';

const useSuperAdminSettings = () => {
  const [settings, setSettings] = useState<SuperAdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/super-admin-settings/');
      
      if (!response.ok) {
        if (response.status === 404) {
          // Initialize if not found
          await initializeSettings();
          return;
        }
        throw new Error('Failed to fetch settings');
      }
      
      const data = await response.json();
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const initializeSettings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/super-admin-settings/initialize', {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to initialize settings');
      
      const data = await response.json();
      setSettings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const updateSettings = async (updates: Partial<SuperAdminSettings>) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/super-admin-settings/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Failed to update settings');
      
      const data = await response.json();
      setSettings(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading, error, updateSettings, refreshSettings: fetchSettings };
};

export default useSuperAdminSettings;
```

### Usage in Settings Component

```typescript
import { useState } from 'react';
import useSuperAdminSettings from './hooks/useSuperAdminSettings';

const SuperAdminSettings = () => {
  const { settings, loading, error, updateSettings } = useSuperAdminSettings();
  const [formData, setFormData] = useState({});

  const handleSave = async () => {
    try {
      await updateSettings(formData);
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Failed to save settings');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!settings) return <div>No settings found</div>;

  return (
    <div>
      {/* General Settings */}
      <input
        value={settings.platform_name}
        onChange={(e) => setFormData({ ...formData, platform_name: e.target.value })}
      />
      
      {/* Toggles */}
      <Toggle
        active={settings.maintenance_mode}
        onChange={() => updateSettings({ maintenance_mode: !settings.maintenance_mode })}
      />
      
      <Toggle
        active={settings.cdn_enabled}
        onChange={() => updateSettings({ cdn_enabled: !settings.cdn_enabled })}
      />
      
      {/* Save Button */}
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};
```

### Simple Fetch Examples

```typescript
// 1. Initialize settings (first time)
const initSettings = async () => {
  const response = await fetch('http://localhost:8000/api/v1/super-admin-settings/initialize', {
    method: 'POST'
  });
  return response.json();
};

// 2. Get current settings
const getSettings = async () => {
  const response = await fetch('http://localhost:8000/api/v1/super-admin-settings/');
  return response.json();
};

// 3. Update maintenance mode
const toggleMaintenance = async (enabled: boolean) => {
  const response = await fetch('http://localhost:8000/api/v1/super-admin-settings/', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ maintenance_mode: enabled })
  });
  return response.json();
};

// 4. Update multiple fields
const updateConfig = async () => {
  const response = await fetch('http://localhost:8000/api/v1/super-admin-settings/', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      platform_name: 'MyPlatform',
      tax_rate: 20.0,
      forced_2fa: true,
      session_timeout_minutes: 60
    })
  });
  return response.json();
};
```

---

## Testing with cURL

```bash
# Initialize settings
curl -X POST "http://localhost:8000/api/v1/super-admin-settings/initialize"

# Get settings
curl "http://localhost:8000/api/v1/super-admin-settings/"

# Update settings
curl -X PUT "http://localhost:8000/api/v1/super-admin-settings/" \
  -H "Content-Type: application/json" \
  -d '{
    "maintenance_mode": true,
    "tax_rate": 20.0,
    "forced_2fa": false
  }'

# Update toggle (e.g., CDN)
curl -X PUT "http://localhost:8000/api/v1/super-admin-settings/" \
  -H "Content-Type: application/json" \
  -d '{"cdn_enabled": false}'
```

---

## Integration Checklist

### Backend ✅
- [x] Database model created
- [x] Pydantic schemas defined
- [x] CRUD endpoints implemented
- [x] Router registered in API
- [x] Initialize endpoint for first-time setup

### Frontend Integration Steps

1. **Import the service** (already created at `src/services/superAdminSettingsService.ts`)
   ```typescript
   import { superAdminSettingsService } from '../services/superAdminSettingsService';
   ```

2. **Fetch settings on component mount**
   ```typescript
   useEffect(() => {
     loadSettings();
   }, []);

   const loadSettings = async () => {
     try {
       const data = await superAdminSettingsService.getSettings();
       setSettings(data);
     } catch (error) {
       // Initialize if not found
       const data = await superAdminSettingsService.initializeSettings();
       setSettings(data);
     }
   };
   ```

3. **Update settings on save**
   ```typescript
   const handleSave = async () => {
     await superAdminSettingsService.updateSettings({
       platform_name: formData.platformName,
       maintenance_mode: formData.maintenanceMode,
       // ... other fields
     });
   };
   ```

4. **Update toggles immediately**
   ```typescript
   const handleToggle = async (field: string, value: boolean) => {
     await superAdminSettingsService.updateSettings({ [field]: value });
     // Refresh settings
     await loadSettings();
   };
   ```

---

## Notes

- **Singleton Pattern**: Only one settings record exists in the database
- **Partial Updates**: You can update any subset of fields
- **Auto-initialization**: Use `/initialize` endpoint for first-time setup
- **Type Safety**: TypeScript interfaces provided for frontend
- **Service Ready**: `superAdminSettingsService.ts` already created in `src/services/`

---

## Next Steps

1. Run the server: `uvicorn app.main:app --reload`
2. Initialize settings: `POST http://localhost:8000/api/v1/super-admin-settings/initialize`
3. Integrate into your Settings.tsx component using the provided examples
4. Test all toggles and form fields
5. Add authentication/authorization before production
