// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Nav from "./components/navbar/nav";
import ImageSlider from "./components/home/home";
import FoodGallery1 from "./components/fooditem/food";
import DrinkGallery from "./components/fooditem/drink";
import MealPage from "./components/category/Meal";
import AllItemsPage1 from "./components/fooditem/AllItemsPage";
import Cart from "./components/cart/cart";
import Categories from "./components/category/categoryitem";
import About from "./components/About/about";
import Footer from "./components/footer/footer";
import OrderTracking from "./components/OrderTracking/OrderTracking";
import UserPage from "./components/UserPage/user";
import Login from "./components/login/login";
import Signup from "./components/login/Signup";
import AdminLogin from "./components/login/AdminLogin";
import AdminSignup from "./components/login/AdminSignup";
import AdminPanel from "./components/admin/AdminPanel";
import Dashboard from "./components/admin/Dashboard";
import SearchPage from "./components/fooditem/search";

import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import Offer from "./components/offer/offer";
import GifExample from "./components/page/page";
import WeekendFood from "./components/weekend/weekend";
import Announcement from "./components/announcement/announcement";
import Offer2 from "./components/offer2/offer2";

// ---------------------------
// Landing Modal
// ---------------------------
const LandingModal = ({ onChoose }) => {
  const navigate = useNavigate();
  return (
    <div className="landing-modal">
      <h2>Welcome!</h2>
      <p>Choose your view:</p>
      <div className="landing-buttons">
        <button
          onClick={() => {
            navigate("/login");
            onChoose("user");
          }}
        >
          User Sign Up / Login
        </button>
        <button
          onClick={() => {
            localStorage.getItem("adminUser")
              ? navigate("/AdminLogin")
              : navigate("/AdminSignup");
            onChoose("admin");
          }}
        >
          Admin Login / Signup
        </button>
      </div>
    </div>
  );
};

// ---------------------------
// Protected Routes
// ---------------------------
const ProtectedUserRoute = ({ user, children }) =>
  !user ? <Navigate to="/login" /> : children;

const ProtectedAdminRoute = ({ admin, children }) =>
  !admin ? <Navigate to="/AdminLogin" /> : children;

// ---------------------------
// Main App Component
// ---------------------------
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState(
    JSON.parse(localStorage.getItem("menuItems")) || []
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [showLandingModal, setShowLandingModal] = useState(true);

  const handleChoose = () => setShowLandingModal(false);

  // ---------------------------
  // Load orders from Firestore (real-time)
  // ---------------------------
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(allOrders);
    });
    return () => unsubscribe();
  }, []);

  // ---------------------------
  // Sync menuItems & users to localStorage
  // ---------------------------
  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ---------------------------
  // Cart Functions
  // ---------------------------
  const addToCart = (item) => {
    if (!user) return alert("Please log in to add items to cart.");
    const existing = cartItems.find((i) => i.id === item.id);
    if (existing) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) =>
    setCartItems(cartItems.filter((i) => i.id !== id));

  // ---------------------------
  // Place Order (Firestore)
  // ---------------------------
  const placeOrder = async (mobile) => {
    if (!user) return alert("Please log in to place an order.");
    if (cartItems.length === 0) return alert("Cart is empty!");
    if (!mobile || mobile.length !== 10) return alert("Enter valid mobile number!");

    try {
      await addDoc(collection(db, "orders"), {
        items: cartItems,
        total: cartItems.reduce((sum, i) => sum + parseInt(i.price) * (i.qty || 1), 0),
        mobile,
        status: "Order Received",
        assignedTo: null,
        userId: user?.uid || null,
        createdAt: Date.now(),
      });

      setCartItems([]);
      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("Order failed:", err);
      alert("❌ Failed to place order");
    }
  };

  const hideFooterOn = ["/login", "/signup", "/AdminLogin", "/AdminSignup"];
  const showFooter = !hideFooterOn.includes(location.pathname);

  const hideNavbarOn = ["/admin-panel", "/dashboard"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && (
        <Nav
          cartItems={cartItems}
          user={user}
          setUser={setUser}
          admin={admin}
          setAdmin={setAdmin}
        />
      )}

      {showLandingModal && <LandingModal onChoose={handleChoose} />}

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedUserRoute user={user}>
              <section className="slider-section">
                <ImageSlider />
                <Categories />
                <Offer/>
                <GifExample/>
                <Offer2/>
                <WeekendFood/>
                <Announcement/>
                {/* <About /> */}
              </section>
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />

        {/* User Pages */}
        <Route path="/login" element={<Login setUser={setUser} setUsers={setUsers} />} />
        <Route path="/signup" element={<Signup setUser={setUser} setUsers={setUsers} />} />
        <Route
          path="/user"
          element={
            <ProtectedUserRoute user={user}>
              <UserPage cartItems={cartItems} orders={orders} user={user} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />

        {/* Admin Pages */}
        <Route path="/AdminSignup" element={<AdminSignup setAdmin={setAdmin} />} />
        <Route path="/AdminLogin" element={<AdminLogin setAdmin={setAdmin} />} />
        <Route
          path="/admin-panel"
          element={
            <ProtectedAdminRoute admin={admin}>
              <AdminPanel orders={orders} setOrders={setOrders} />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute admin={admin}>
              <Dashboard orders={orders} menuItems={menuItems} users={users} />
            </ProtectedAdminRoute>
          }
        />

        {/* Food / Drink / Meal */}
        <Route
          path="/All-item"
          element={
            <ProtectedUserRoute user={user}>
              <AllItemsPage1 addToCart={addToCart} menuItems={menuItems} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/Meal"
          element={
            <ProtectedUserRoute user={user}>
              <MealPage addToCart={addToCart} menuItems={menuItems} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/food"
          element={
            <ProtectedUserRoute user={user}>
              <FoodGallery1 addToCart={addToCart} menuItems={menuItems} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/drink"
          element={
            <ProtectedUserRoute user={user}>
              <DrinkGallery addToCart={addToCart} menuItems={menuItems} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedUserRoute user={user}>
              <SearchPage addToCart={addToCart} menuItems={menuItems} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />

        {/* Cart / Tracking */}
        <Route
          path="/cart"
          element={
            <ProtectedUserRoute user={user}>
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                placeOrder={placeOrder}
              />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/tracking"
          element={
            <ProtectedUserRoute user={user}>
              <OrderTracking orders={orders} setOrders={setOrders} />
              {showFooter && <Footer />}
            </ProtectedUserRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
