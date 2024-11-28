"use client"; 

import { useEffect, useState } from "react";

const HomePage = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/stock/all");
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <p>Loading stock data...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Prices</h1>
      {stocks.length === 0 ? (
        <p>No stock data available.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Symbol</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{stock.symbol}</td>
                <td className="border border-gray-300 px-4 py-2">${stock.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(stock.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.href = "/stock"}
        >
          Go to Stock Dashboard
        </button>
      </div>
    </div>
  );
};

export default HomePage;
