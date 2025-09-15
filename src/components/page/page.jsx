import React, { useEffect } from "react";
import './page.css';

function Page() {
  const items = [
    { icon: "🍔", name: "Burger", content: "Delicious burgers available." },
    { icon: "🎁", name: "Gift", content: "Special gift packs for you." },
    { icon: "🛵", name: "Delivery", content: "Fast and reliable delivery." },
    { icon: "🥗", name: "Salad", content: "Fresh and healthy salads." },
    { icon: "⏰", name: "Time", content: "Quick service guaranteed." },
    { icon: "🥢", name: "Chopsticks", content: "Enjoy Asian cuisine." },
  ];

  useEffect(() => {
    const cards = document.querySelectorAll('.icon-card');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          // Staggered delay: snake-like effect
          entry.target.style.setProperty('--delay', `${(index % 3) * 0.2}s`);
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
  }, []);

  return (
    <div className="container">
      <h2 className="heading">Special Services</h2>
      <div className="grid">
        {items.map((item, index) => (
          <div className="icon-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3 className="name">{item.name}</h3>
            <p className="content">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
