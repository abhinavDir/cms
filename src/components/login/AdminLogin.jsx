import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Same style as user login/signup

function AdminLogin({ setAdmin }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedAdmin = JSON.parse(localStorage.getItem("adminUser"));
    if (!storedAdmin) return alert("No admin found, please sign up first!");

    if (
      credentials.username === storedAdmin.username &&
      credentials.password === storedAdmin.password
    ) {
      setAdmin(true);
      localStorage.setItem("isAdmin", "true");
      alert("Login successful!");
      navigate("/admin-panel");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="signup-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Admin Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span onClick={() => navigate("/AdminSignup")}>Sign Up</span>
      </p>
    </div>
  );
}

export default AdminLogin;
