# Stock Price Tracker

## 🚀 Overview
Stock Price Tracker is a full-stack web application built to track stock prices. It provides users with the ability to view the latest stock prices, historical data for specific stocks, and a dashboard with real-time updates.

The project features a **FastAPI** backend, **Next.js** frontend, SQLite database, and **Redis** caching for improved performance.

---
<iframe width="560" height="315" src="https://www.youtube.com/embed/FJCpeDtTm1Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 🛠 Features

### **Backend**
- **API Endpoints**:
  - `/stock/{symbol}`: Fetch the latest price for a specific stock symbol.
  - `/stock/{symbol}/history`: Retrieve historical data for a stock.
  - `/stock/all`: Get the latest prices for all stocks in the database.
- **Database**: SQLite for storing historical stock prices.
- **Caching**: Redis caching to speed up data retrieval for frequently accessed stock data.

### **Frontend**
- **Home Page**:
  - Displays a table with the latest prices of all stocks in the database.
  - Provides a button to navigate to the stock dashboard.
- **Stock Dashboard**:
  - Search for specific stocks.
  - View historical prices and the latest price for a given stock symbol.

---

## 💻 Technologies Used

### **Backend**
- **Framework**: FastAPI
- **Database**: SQLite
- **Cache**: Redis
- **Language**: Python

### **Frontend**
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Language**: JavaScript/React.js

---

## 🔧 Installation and Setup

### **Backend**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/stock-price-tracker.git
   cd stock-price-tracker/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate   # For Linux/Mac
   .\stock-tracker-env\Scripts\activate    # For Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the server:
   ```bash
   $env:PYTHONPATH="$PWD\backend"; uvicorn backend.app.main:app --reload
   ```

5. Start Redis server:
   ```bash
   $env:Path += ";C:\Program Files\Redis"
   redis-server
   ```

### **Frontend**
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🌟 Usage

1. Open your browser and navigate to the frontend:
   - Home page: [http://localhost:3000](http://localhost:3000)
   - Stock dashboard: [http://localhost:3000/stock](http://localhost:3000/stock)

2. Interact with the backend via:
   - `http://127.0.0.1:8000/stock/{symbol}`
   - `http://127.0.0.1:8000/stock/all`
   - `http://127.0.0.1:8000/stock/{symbol}/history`

---

## 📂 Project Structure

```
stock-price-tracker/
│
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI application entry point
│   │   ├── routes/
│   │   ├── database.py       # Database configuration
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── redis_cache.py    # Redis cache integration
│   ├── requirements.txt      # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app pages
│   │   ├── components/       # React components
│   ├── package.json          # Frontend dependencies
│
└── README.md                 # Project documentation
```

## 🔗 Links
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
