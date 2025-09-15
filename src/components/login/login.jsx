import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login({ setUser }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("userSignup"));

    if (!savedUser) return alert("No account found. Please sign up first!");
    if (name === savedUser.name && mobile === savedUser.mobile) {
      setUser(savedUser);
      navigate("/home96*5805"); // redirect to user page
    } else {
      alert("Invalid Name or Mobile!");
    }
  };

  return (
    <div className="login-page">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Enter the username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Mobile No."
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
