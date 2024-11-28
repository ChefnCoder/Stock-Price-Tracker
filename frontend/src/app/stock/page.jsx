"use client"; // Required for client-side rendering

import { useEffect, useState } from "react";

const StockPage = () => {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [stockPrice, setStockPrice] = useState(null);
  const [stockHistory, setStockHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch stock data
  const fetchStockData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch latest stock price
      const priceResponse = await fetch(`http://127.0.0.1:8000/stock/${stockSymbol}`);
      const priceData = await priceResponse.json();
      if (priceData.error) {
        setError(priceData.error);
        setStockPrice(null);
        setStockHistory([]);
        return;
      }
      setStockPrice(priceData.price);

      // Fetch historical prices
      const historyResponse = await fetch(`http://127.0.0.1:8000/stock/${stockSymbol}/history`);
      const historyData = await historyResponse.json();
      setStockHistory(historyData.history || []);
    } catch (err) {
      setError("Failed to fetch stock data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [stockSymbol]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Price Dashboard</h1>

      <div className="mb-4">
        <label htmlFor="stock-symbol" className="block mb-2 font-medium">
          Enter Stock Symbol:
        </label>
        <input
          id="stock-symbol"
          type="text"
          className="border p-2 rounded mb-2 w-full"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          placeholder="e.g., AAPL"
        />
        <button
          onClick={fetchStockData}
          className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
        >
          Get Stock Data
        </button>
      </div>

      {loading ? (
        <p>Loading stock data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          {stockPrice !== null && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Latest Stock Price:</h2>
              <p>${stockPrice}</p>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold">Historical Prices:</h2>
            {stockHistory.length === 0 ? (
              <p>No historical data available.</p>
            ) : (
              <ul>
                {stockHistory.map((record, index) => (
                  <li key={index} className="border p-2 mb-2 rounded shadow">
                    <p>Price: ${record.price}</p>
                    <p>Timestamp: {new Date(record.timestamp).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPage;

