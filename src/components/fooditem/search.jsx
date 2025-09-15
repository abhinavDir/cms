import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

const ITEMS = [
  { id: 1, name: "Margherita Pizza", category: "allitems" },
  { id: 2, name: "Cheese Burger", category: "food" },
  { id: 3, name: "Cold Drink", category: "drink" },
  { id: 4, name: "Coffee", category: "drink" },
  { id: 5, name: "Veg Salad", category: "meal" },
];

function SearchPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredItems = ITEMS.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleItemClick = (item) => {
    const routeMap = {
      allitems: "/allitems", // ✅ new page for All Items
      food: "/food",
      drink: "/drink",
      meal: "/Meal",
    };

    const path = routeMap[item.category] || "/allitems"; // default to allitems

    navigate(`${path}?category=${encodeURIComponent(item.name)}`);
  };

  return (
    <div className="search-page">
      <h2>🔍 Search Food</h2>
      <input
        type="text"
        placeholder="Search food items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-box"
      />
      <div className="results">
        {query &&
          filteredItems.map(item => (
            <div
              key={item.id}
              className="food-card"
              onClick={() => handleItemClick(item)}
            >
              <h3>{item.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
