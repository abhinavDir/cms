import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./food.css";
import Pizza from '../../assets/pizza.jpeg';
import Burger from '../../assets/burger.jpeg';
import Sushi from '../../assets/fast.webp';
import MealImg from '../../assets/meal.webp';

const ALL_ITEMS = [
  { id: 1, title: "Margherita Pizza", price: "₹299", img: Pizza, desc: "Classic pizza with tomato, mozzarella & basil.", category: "Pizza" },
  { id: 2, title: "Cheese Burger", price: "₹199", img: Burger, desc: "Juicy patty with cheddar, lettuce & special sauce.", category: "Fast Food" },
  { id: 3, title: "Sushi Roll", price: "₹250", img: Sushi, desc: "Fresh sushi roll.", category: "Fast Food" },
  { id: 4, title: "Veg Salad", price: "₹120", img: MealImg, desc: "Fresh veggie salad.", category: "Meals" },
];

function FoodGallery1({ addToCart }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category"); // category from URL

  const [openItem, setOpenItem] = useState(null);
  const [items, setItems] = useState(ALL_ITEMS);

  useEffect(() => {
    if (category && category !== "All item") {
      setItems(ALL_ITEMS.filter(item => item.category === category));
    } else {
      setItems(ALL_ITEMS);
    }
  }, [category]);

  const openModal = (item) => setOpenItem(item);
  const closeModal = () => setOpenItem(null);

  return (
    <div className="food-page">
      <h2>{category || "Our Menu"}</h2>
      <div className="food-grid">
        {items.map((item) => (
          <div key={item.id} className="food-card" onClick={() => openModal(item)}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>

      {openItem && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <img src={openItem.img} alt={openItem.title} />
            <h3>{openItem.title}</h3>
            <p>{openItem.price}</p>
            <p>{openItem.desc}</p>
            <div className="modal-actions">
              <button className="btn" onClick={() => { addToCart(openItem); closeModal(); }}>
                Add to Cart
              </button>
              <button className="btn secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodGallery1;
