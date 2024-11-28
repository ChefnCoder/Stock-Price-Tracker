from app.database import Base, engine

from app.models import StockPrice

def init_db():
    
    print("Initializing database...")
    print("Tables registered with Base:", Base.metadata.tables.keys())
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully!")

if __name__ == "__main__":
    init_db()
