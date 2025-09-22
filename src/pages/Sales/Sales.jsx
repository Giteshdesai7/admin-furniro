import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css";

const Sales = ({ url }) => {
  const [salesData, setSalesData] = useState({
    dailySales: 0,
    monthlySales: 0,
    yearlySales: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/sales/stats`);
      if (response.data.success) {
        setSalesData(response.data.data);
      } else {
        console.log("Error fetching sales data");
      }
    } catch (error) {
      console.log("Failed to fetch sales data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
    
    // Refresh data every minute to keep it updated
    const intervalId = setInterval(() => {
      fetchSalesData();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="sales-dashboard">
      <h3>Sales Dashboard</h3>
      
      {loading ? (
        <div className="loading">Loading sales data...</div>
      ) : (
        <div className="sales-cards">
          <div className="sales-card daily">
            <h4>Daily Sales</h4>
            <p className="sales-amount">₹{salesData.dailySales.toLocaleString()}</p>
            <p className="sales-info">Resets at midnight</p>
          </div>
          
          <div className="sales-card monthly">
            <h4>Monthly Sales</h4>
            <p className="sales-amount">₹{salesData.monthlySales.toLocaleString()}</p>
            <p className="sales-info">Resets at month end</p>
          </div>
          
          <div className="sales-card yearly">
            <h4>Yearly Sales</h4>
            <p className="sales-amount">₹{salesData.yearlySales.toLocaleString()}</p>
            <p className="sales-info">Running total for the year</p>
          </div>
        </div>
      )}
      
      <div className="actions">
        <button onClick={fetchSalesData} className="refresh-btn">
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default Sales; 