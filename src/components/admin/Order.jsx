import React, { useEffect, useState } from "react";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div>
      <h1>📦 Orders</h1>
      {orders.length === 0 ? <p>No orders yet</p> : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order #{order.id}</strong> - {order.status} <br />
              Items: {order.items.join(", ")} <br />
              Total: ₹{order.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;
