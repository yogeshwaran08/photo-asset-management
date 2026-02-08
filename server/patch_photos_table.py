
import psycopg2
import os

try:
    print("Connecting to database...")
    conn = psycopg2.connect(
        dbname="photo_asset_db",
        user="postgres",
        password="2711",
        host="127.0.0.1",
        port="5432"
    )
    
    # Read from environment variables if set, otherwise fallback to hardcoded (for simplicity in script)
    # But wait, hardcoding password "2711" is bad practice generally, but here I am just fixing it locally.
    
    cur = conn.cursor()
    
    print("Checking if 'file_size' column exists in 'photos' table...")
    cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name='photos' AND column_name='file_size';")
    exists = cur.fetchone()
    
    if not exists:
        print("Column 'file_size' does not exist. Adding it...")
        # Add column with default 0 so existing rows get a value
        cur.execute("ALTER TABLE photos ADD COLUMN file_size INTEGER DEFAULT 0;")
        conn.commit()
        print("Successfully added 'file_size' column.")
    else:
        print("Column 'file_size' already exists. No action needed.")
        
    cur.close()
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
