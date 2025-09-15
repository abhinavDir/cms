import React from "react";
import { useLocation } from "react-router-dom";
import FoodGallery1 from "./food";

function Menu({ addToCart }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category"); // get category from URL

  return <FoodGallery1 addToCart={addToCart} category={category} />;
}

export default Menu;
