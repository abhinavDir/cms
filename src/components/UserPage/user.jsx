import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";

const UserPage = ({ cartItems, user, orders }) => {
  const navigate = useNavigate();

  if (!user) {
    return <p>Please login to view your profile.</p>;
  }

  const goToOrderTracking = (orderId) => {
    navigate(`/tracking?orderId=${orderId}`);
  };

  return (
    <div className="user-page">
      <header className="user-header">
        <div className="avatar">{user.name.charAt(0)}</div>
        <div className="user-details">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.mobile}</p>
        </div>
      </header>

      <section className="user-section cart-summary">
        <h3>Cart Summary</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.title} x {item.qty || 1} - ₹{parseInt(item.price.replace("₹","")) * (item.qty || 1)}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="user-section orders">
        <h3>Order History</h3>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-info">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Items:</strong> {order.items.join(", ")}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <p>
                    <strong>Status:</strong>
                    <span className={`status ${order.status.replace(/\s+/g, "-").toLowerCase()}`}>
                      {order.status}
                    </span>
                  </p>
                </div>
                {order.status !== "Delivered" && (
                  <button className="tracking-btn" onClick={() => goToOrderTracking(order.id)}>
                    Track Order
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserPage;
