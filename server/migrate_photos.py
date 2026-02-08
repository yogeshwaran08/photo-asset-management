from app.db.session import engine
from sqlalchemy import text
import sys

def add_column():
    print("Adding event_id to photos table...")
    try:
        with engine.connect() as conn:
            conn.execute(text('ALTER TABLE photos ADD COLUMN event_id INTEGER REFERENCES events(id)'))
            conn.commit()
            print("SUCCESS: event_id column added to photos table")
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    add_column()
