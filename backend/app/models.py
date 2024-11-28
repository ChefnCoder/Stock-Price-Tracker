from sqlalchemy import Column, Integer, String, Float, DateTime  
from datetime import datetime  

from app.database import Base

class StockPrice(Base):
    __tablename__ = "stock_prices"
    
    id = Column(Integer, primary_key=True, index=True)  
    symbol = Column(String, index=True) 
    price = Column(Float, nullable=False)  
    timestamp = Column(DateTime, default=datetime.utcnow) 