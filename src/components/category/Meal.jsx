import React, { useState, useEffect } from "react";
import "./Meal.css"; 


const MEAL_ITEMS = [
  { id: 1, title: "Veg Salad", price: "₹120" },
  { id: 2, title: "Chicken Salad", price: "₹150"},
  { id: 3, title: "Pasta Meal", price: "₹180"},
];

function MealPage({ addToCart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(MEAL_ITEMS);
  }, []);

  return (
    <div className="food-page">
      <h2>Meals Menu</h2>
      <div className="food-grid">
        {items.map((item, idx) => (
          <div key={item.id} className="food-card" style={{ "--delay": `${idx * 0.1}s` }} onClick={() => addToCart(item)}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealPage;
