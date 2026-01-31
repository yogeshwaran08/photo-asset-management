# Backend Server

## Setup

1. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Setup Database:
   - Ensure PostgreSQL is running.
   - Create a database named `photo_asset_db` (or whatever you set in .env).
   - Configure `.env` file with your DB credentials.

4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Structure
- `app/main.py`: Entry point.
- `app/api`: API endpoints (Controllers).
- `app/models`: SQLAlchemy Database Models.
- `app/schemas`: Pydantic Schemas (Data Transfer Objects).
- `app/core`: Configuration.
- `app/db`: Database connection and session.
