import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';

const Inventory = ({ url = (import.meta?.env?.VITE_API_URL || "http://localhost:4000") }) => {
  const [productItems, setProductItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductItems();
  }, []);

  const fetchProductItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/product/list`);
      setProductItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product items:', error);
      console.log('Failed to load product items');
      setLoading(false);
    }
  };

  const updateStock = async (id, stock) => {
    try {
      await axios.post(`${url}/api/product/update-stock`, { id, stock });
      console.log('Stock updated successfully');
      fetchProductItems(); // Refresh the list
    } catch (error) {
      console.error('Error updating stock:', error);
      console.log('Failed to update stock');
    }
  };

  const handleStockChange = (id, newStock) => {
    // Create a copy of productItems
    const updatedItems = productItems.map(item => {
      if (item._id === id) {
        return { ...item, stock: newStock };
      }
      return item;
    });
    setProductItems(updatedItems);
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Management</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Current Stock</th>
              <th>Update Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productItems.map(item => (
              <tr key={item._id}>
                <td>
                  <img 
                    src={`${url}/images/${item.image}`} 
                    alt={item.name} 
                    className="inventory-product-image" 
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.stock || 0}</td>
                <td>
                  <input 
                    type="number" 
                    min="0"
                    value={item.stock || 0}
                    onChange={(e) => handleStockChange(item._id, parseInt(e.target.value))}
                    className="stock-input"
                  />
                </td>
                <td>
                  <button 
                    onClick={() => updateStock(item._id, item.stock)}
                    className="update-button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory; 