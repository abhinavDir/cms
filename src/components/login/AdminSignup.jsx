import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Same style as user signup/login

function AdminSignup({ setAdmin }) {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adminData.username || !adminData.password) return alert("Fill all fields");
    
    // Save admin credentials to localStorage
    localStorage.setItem("adminUser", JSON.stringify(adminData));
    alert("Admin registered successfully!");
    navigate("/AdminLogin");
  };

  return (
    <div className="signup-page">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Admin Username"
          name="username"
          value={adminData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={adminData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <span onClick={() => navigate("/AdminLogin")}>Login</span>
      </p>
    </div>
  );
}

export default AdminSignup;
