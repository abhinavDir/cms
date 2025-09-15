import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = ({ orders, menuItems, users }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalMenuItems: 0,
    totalUsers: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {
    setStats({
      totalOrders: orders.length,
      totalMenuItems: menuItems.length,
      totalUsers: users.length,
      pendingOrders: orders.filter(o => o.status !== "Delivered" && o.status !== "Rejected" && o.status !== "Cancelled").length,
      deliveredOrders: orders.filter(o => o.status === "Delivered").length,
    });
  }, [orders, menuItems, users]);

  return (
    <div className="dashboard">
      <h1>📊 Admin Dashboard</h1>
      <p>Quick stats of users, orders, and menu items.</p>

      <div className="cards-container">
        <div className="card orders">
          <h2>{stats.totalOrders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="card pending">
          <h2>{stats.pendingOrders}</h2>
          <p>Pending Orders</p>
        </div>

        <div className="card delivered">
          <h2>{stats.deliveredOrders}</h2>
          <p>Delivered Orders</p>
        </div>

        <div className="card menu">
          <h2>{stats.totalMenuItems}</h2>
          <p>Menu Items</p>
        </div>

        <div className="card users">
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
