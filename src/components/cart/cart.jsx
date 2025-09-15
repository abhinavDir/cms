// src/components/cart/cart.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Cart({ cartItems, placeOrder }) {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [orderStatus, setOrderStatus] = useState(""); // "", "processing", "success"

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + parseInt(item.price.replace("₹", "")) * (item.qty || 1),
    0
  );

  const handleOrder = () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    if (!mobile || mobile.length !== 10)
      return alert("Enter valid mobile number!");

    setOrderStatus("processing");

    setTimeout(() => {
      placeOrder(mobile);
      setOrderStatus("success");
    }, 1500);
  };

  return (
    <div className="cart-page">
      <h2>🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item, idx) => (
          <div key={idx} className="cart-item">
            <img src={item.img} alt={item.title} />
            <div>
              {item.title} x {item.qty || 1}
            </div>
          </div>
        ))
      )}

      <h3>Total: ₹{totalPrice}</h3>

      <input
        type="tel"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <button onClick={handleOrder} disabled={orderStatus === "processing"}>
        {orderStatus === "processing" ? "Processing..." : "Place Order"}
      </button>

      {orderStatus === "success" && (
        <div>
          <p>✅ Order placed! Admin will contact you.</p>
          <button onClick={() => navigate("/tracking")}>
            View Tracking
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
