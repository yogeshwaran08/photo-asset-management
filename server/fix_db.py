
import sqlite3

def fix_db():
    try:
        conn = sqlite3.connect('app.db')  # Or whatever the DB file is named. Is it 'app.db' or something else? I should check this.
        cursor = conn.cursor()
        
        # Check if column exists first
        cursor.execute("PRAGMA table_info(photos)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'file_size' not in columns:
            print("Adding file_size column to photos table...")
            cursor.execute("ALTER TABLE photos ADD COLUMN file_size INTEGER DEFAULT 0")
            conn.commit()
            print("Successfully added file_size column.")
        else:
            print("file_size column already exists.")

        conn.close()
    except Exception as e:
        print(f"Error updating database: {e}")

if __name__ == "__main__":
    fix_db()
