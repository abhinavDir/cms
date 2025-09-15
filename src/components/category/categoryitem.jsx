import React from "react";
import { useNavigate } from "react-router-dom";
import "./categories.css";

import Img from "../../assets/browse1.jpeg";
import burgerImg from "../../assets/drink.webp";
import sushiImg from "../../assets/fast.webp";
import saladImg from "../../assets/meal.webp";

const categories = [
  { name: "All item", img: Img },
  { name: "Drinks", img: burgerImg },
  { name: "Fast Food", img: sushiImg },
  { name: "Meals", img: saladImg },
];

const Categories = () => {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    const categoryRouteMap = {
      "All item": "/All-item",
      "Drinks": "/drink",
      "Fast Food": "/food",
      "Meals": "/meal",
      };
  const route = categoryRouteMap[category];
  if (route) {
    navigate(`${route}?category=${category}`);
  }
};
    
  //   const route = categoryRouteMap[category];
  //   navigate(`${route}?category=${category}`);
  // };

  return (
   
      <div className="categories-section">
        <h2 className="section-title">Categories</h2>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => goToCategory(cat.name)}
            >
              <img src={cat.img} alt={cat.name} className="category-img" />
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Categories;
