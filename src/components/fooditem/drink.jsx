import React, { useState } from "react";
import "./food.css"; // use same CSS
import ColdDrinkImg from '../../assets/colddrink.webp';
import CoffeeImg from '../../assets/drink.webp';

const DRINKS = [
  { id: 1, title: "Cold Drink", price: "₹50", img: ColdDrinkImg, desc: "Refreshing cold drink." },
  { id: 2, title: "Coffee", price: "₹80", img: CoffeeImg, desc: "Hot brewed coffee." }
];

function DrinkGallery({ addToCart }) {
  const [openItem, setOpenItem] = useState(null);

  const openModal = (item) => setOpenItem(item);
  const closeModal = () => setOpenItem(null);

  return (
    <div className="food-page">
      <h2>Drinks Menu</h2>
      <div className="food-grid">
        {DRINKS.map((item, idx) => (
          <div key={item.id} className="food-card" style={{ "--delay": `${idx * 0.1}s` }} onClick={() => openModal(item)}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>

      {openItem && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <img src={openItem.img} alt={openItem.title} />
            <h3>{openItem.title}</h3>
            <p>{openItem.price}</p>
            <p>{openItem.desc}</p>
            <div className="modal-actions">
              <button className="btn" onClick={() => { addToCart(openItem); closeModal(); }}>Add to Cart</button>
              <button className="btn secondary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DrinkGallery;
