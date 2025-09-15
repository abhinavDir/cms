import React from "react";
import { FaHamburger, FaTruck, FaRupeeSign, FaLeaf } from "react-icons/fa";
import "./about.css";

function About() {
  const aboutData = [
    {
      icon: <FaHamburger />,
      title: "Delicious Food",
      desc: "Freshly prepared meals with authentic flavors to satisfy your cravings.",
    },
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      desc: "Enjoy quick doorstep delivery or superfast service at our counters.",
    },
    {
      icon: <FaRupeeSign />,
      title: "Affordable Prices",
      desc: "Tasty meals at pocket-friendly prices without compromise on quality.",
    },
    {
      icon: <FaLeaf />,
      title: "Fresh & Hygienic",
      desc: "High standards of hygiene with only farm-fresh ingredients used.",
    },
  ];

  return (
    <section className="about-section">
      <h1 className="about-title">Welcome to Our Canteen</h1>
      <p className="about-subtitle">
        Just like McDonald's, we serve <strong>quality, taste, and happiness</strong> in every bite.
      </p>

      <div className="about-grid">
        {aboutData.map((item, index) => (
          <div className="about-card" key={index}>
            <div className="about-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
