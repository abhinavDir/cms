import React, { useState, useEffect } from "react";
import './home.css';
import Image3 from '../../assets/4.jpg';
import Image2 from '../../assets/3.jpg';
import  Image1 from '../../assets/2.jpg';
import Image4 from '../../assets/1.jpg';

const images = [Image3,Image2, Image1,Image4];

function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Automatic slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 7000); // change slide every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [length]);

  return (
    <div className="slider-container">
      {images.map((img, index) => (
        <div
          key={index}
          className={index === current ? "slide active" : "slide"}
        >
          {index === current && (
            <img src={img} alt={`slide ${index}`} className="bg-image" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ImageSlider;
