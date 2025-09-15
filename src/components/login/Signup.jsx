import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !mobile || !email) return alert("Fill all fields!");

    // Save user data to localStorage
    const userData = { name, mobile, email };
    localStorage.setItem("userSignup", JSON.stringify(userData));

    alert("✅ Signed Up Successfully! Please login now.");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="signup-page">
      <h2>SIGN UP</h2>
      <form onSubmit={handleSignup}>
        <input
          placeholder="Enter username...."
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
        <input
          placeholder="Enter email."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Sign UP</button>
      </form>
      <p>
        Already have an account? <Link to="/login">LOGIN</Link>
      </p>
    </div>
  );
}

export default Signup;
