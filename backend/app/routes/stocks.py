from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session
from app.database import get_db
from app.models import StockPrice
from app.redis_cache import redis_client
from app.redis_cache import get_cache, set_cache
router = APIRouter()

STOCK_DATA = {
    "AAPL": 150.00,  # Apple Inc.
    "GOOGL": 2800.00,  # Alphabet Inc
    "MSFT": 300.00,  # Microsoft
    "TSLA":700.0,
    "AMZN":3200.0
}

@router.get("/stock/all")
def get_all_stocks(db: Session = Depends(get_db)):
    
    print("GET /stock/all endpoint called")
    try:
        stocks = db.query(StockPrice).all()
        print("Fetched stocks from database:", stocks)

        stock_data = {}
        for stock in stocks:
            if stock.symbol not in stock_data or stock.timestamp > stock_data[stock.symbol]["timestamp"]:
                stock_data[stock.symbol] = {"price": stock.price, "timestamp": stock.timestamp}
        
        result = [{"symbol": symbol, "price": data["price"], "timestamp": data["timestamp"]} for symbol, data in stock_data.items()]
        print("Processed stock data:", result)
        return result

    except Exception as e:
        print("Error fetching stocks:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/stock/{symbol}/latest")
def get_latest_stock_price(symbol: str, db: Session = Depends(get_db)):
   
    cached_price = redis_client.get(f"stock:{symbol.upper()}:latest")
    if cached_price:
        return {"symbol": symbol, "latest_price": float(cached_price), "source": "cache"}

    latest_price = (
        db.query(StockPrice)
        .filter(StockPrice.symbol == symbol.upper())
        .order_by(StockPrice.timestamp.desc())
        .first()
    )

    if not latest_price:
        raise HTTPException(status_code=404, detail=f"Stock symbol {symbol} not found")

    redis_client.set(f"stock:{symbol.upper()}:latest", latest_price.price, ex=3600)  

    return {"symbol": symbol, "latest_price": latest_price.price, "source": "database"}

@router.get("/stock/{symbol}")
def get_stock_price(symbol: str):
    cached_price = get_cache(symbol)  # Check Redis cache
    if cached_price:
        return {"symbol": symbol, "price": cached_price, "source": "cache"}
    
    price = STOCK_DATA.get(symbol.upper())
    if price:
        set_cache(symbol, price)  # Cache the price in Redis
        return {"symbol": symbol, "price": price, "source": "mock"}
    
    return {"error": f"Stock symbol {symbol} not found"}

@router.get("/stock/{symbol}/history")
def get_stock_history(symbol: str, db: Session = Depends(get_db)):
   
    historical_prices = db.query(StockPrice).filter(StockPrice.symbol == symbol.upper()).all()

    if not historical_prices:
        raise HTTPException(status_code=404, detail=f"No history found for stock symbol {symbol}")

    history = [{"price": record.price, "timestamp": record.timestamp} for record in historical_prices]

    return {"symbol": symbol, "history": history}

