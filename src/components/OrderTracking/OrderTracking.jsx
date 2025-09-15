import React, { useEffect, useState } from "react";
import "./OrderTracking.css";

const stages = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];

const OrderTracking = ({ orders, setOrders }) => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (storedOrders.length > 0) {
      setOrders(storedOrders);
    }
  }, );

  useEffect(() => {
    // Filter active orders and sort most recent first
    const activeOrders = orders
      .filter((o) => o.status !== "Rejected" && o.status !== "Cancelled")
      .sort((a, b) => {
        // If you have createdAt timestamp
        // return new Date(b.createdAt) - new Date(a.createdAt);

        // If using Firebase auto-generated IDs, sort by id lexicographically
        return b.id.localeCompare(a.id);
      });

    setUserOrders(activeOrders);
  }, [orders]);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const updated = orders.map((o) =>
        o.id === id ? { ...o, status: "Cancelled" } : o
      );
      setOrders(updated);
      localStorage.setItem("orders", JSON.stringify(updated));
    }
  };

 

  return (
    <div className="tracking-page">
      <h2>Order Tracking</h2>

      {userOrders.length === 0 ? (
        <div className="tracking-card">
          <h3>No Active Orders</h3>
          <div className="tracking-stages">
            {stages.map((stage, index) => (
              <div key={index} className="stage">
                <div className={`circle ${index === 0 ? "active" : ""}`}>
                  {index + 1}
                </div>
                <p className={index === 0 ? "active" : ""}>{stage}</p>
                {index < stages.length - 1 && <div className="line"></div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        userOrders.map((order) => {
          const currentStageIndex = Math.max(0, stages.indexOf(order.status));
   

          return (
            <div key={order.id} className="tracking-card">
              <h3>Order #{order.id}</h3>
              <p>
                <strong>Items:</strong>{" "}
                {order.items.map((i) => i.title || i).join(", ")}
              </p>

           

              <button
                className="cancel-btn"
                onClick={() => handleCancel(order.id)}
                disabled={order.status === "Delivered"}
              >
                Cancel Order
              </button>

              <div className="tracking-stages">
                {stages.map((stage, index) => (
                  <div key={index} className="stage">
                    <div
                      className={`circle ${
                        index <= currentStageIndex ? "active" : ""
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p className={index <= currentStageIndex ? "active" : ""}>
                      {stage}
                    </p>
                    {index < stages.length - 1 && (
                      <div
                        className={`line ${
                          index < currentStageIndex ? "active" : ""
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderTracking;
