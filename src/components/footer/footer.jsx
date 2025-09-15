// Footer.jsx
import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-col brand-col">
          <h3 className="brand-name">FusionXCanteeN</h3>
          <p>
            Fresh. Hygienic. Delicious. Affordable meals made with care and
            passion. Your hunger, our responsibility.
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-col contact-col">
          <h4>Contact Us</h4>
          <p><FaPhoneAlt /> +91 9335110984</p>
          <p><FaEnvelope /> fusionxcanteen@gmail.com</p>
          <p><FaMapMarkerAlt /> Bhaisamau BKT NH-24 (226201), Lucknow, India</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} FusionXCanteeN | All Rights Reserved.<br />
          Designed by Abhinav Pandey & Vivek Yadav.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
