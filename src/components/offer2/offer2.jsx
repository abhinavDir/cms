

import React from "react";
import './offer2.css';
// import Image1 from '../../assets/2.jpg';
// import Image2 from '../../assets/3.jpg';
import Image3 from '../../assets/offer3.jpg';
import Image4 from '../../assets/offer1.jpg';

const images = [Image4,Image3];

function Offer2() {
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

export default Offer2;
