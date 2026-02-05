try:
    from app.main import app
    print("SUCCESS: App imported correctly")
except Exception as e:
    import traceback
    traceback.print_exc()
