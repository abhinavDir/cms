import React, { useState, useEffect } from "react";
import './announcement.css';
import Image3 from '../../assets/a1.jpg';
import Image2 from '../../assets/a3.jpg';
import Image1 from '../../assets/a2.jpg';
import Image4 from '../../assets/a4.jpg';
import Image5 from '../../assets/a5.jpg';

const images = [Image3, Image2, Image1,Image4,Image5];

function Announcement() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Automatic slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [length]);

  return (
    <div className="announcement-slider">
      {images.map((img, index) => (
        <div
          key={index}
          className={index === current ? "announcement-slide active" : "announcement-slide"}
        >
          <img src={img} alt={`slide ${index}`} className="announcement-img" />
        </div>
      ))}
    </div>
  );
}

export default Announcement;
