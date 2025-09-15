import React from "react";
import './offer.css';
// import Image1 from '../../assets/2.jpg';
// import Image2 from '../../assets/3.jpg';
// import Image3 from '../../assets/4.jpg';
import Image4 from '../../assets/offer.jpg';

const images = [Image4];

function Offer() {
  return (
    <div className="offer-strip">
      <div className="slider-track">
        {images.concat(images).map((img, index) => (
          <div className="slide-item" key={index}>
            <img src={img} alt={`offer ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offer;
