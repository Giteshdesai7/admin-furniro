import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./Orders.css";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url+"/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        console.log("Error fetching orders");
      }
    } catch (error) {
      console.log("Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(url+"/api/order/status", {
        orderId,
        status: newStatus,
      });

      if (response.data.success) {
        // Update order status in local state to prevent UI flickering
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.log("Failed to update status");
      }
    } catch (error) {
      console.log("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <div className="order-item-product">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-details">
                    <span>{item.name}</span>
                    <span>× {item.quantity}</span>
                    {item.selectedColor && (
                      <span className="color-indicator" title="Color">
                        <span className="color-swatch" style={{backgroundColor: item.selectedColor}}></span>
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="size-chip">{item.selectedSize}</span>
                    )}
                  </div>
                ))}
              </div>

              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Order Id: {order._id}</p>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <p className={`payment-method ${(order.paymentMethod || 'prepaid') === 'cash-on-delivery' ? 'cod' : 'prepaid'}`}>
              {(order.paymentMethod || 'prepaid') === 'cash-on-delivery' ? 'Cash on Delivery' : 'Prepaid'}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status} // Ensure status is displayed correctly
            >
              <option value="Product Processing">Product Processing</option>
              <option value="Out For Shipping">Out For Shipping</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
