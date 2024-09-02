import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-logo">CarZone</h4>
          <p className="footer-description">
            Your trusted partner in buying and selling used cars. Discover the
            best deals and connect with reliable dealers.
          </p>
        </div>

        <div className="footer-section">
          <h5 className="footer-heading">Quick Links</h5>
          <ul className="footer-links">
            <li>
              <a href="/buy">Buy a Car</a>
            </li>
            <li>
              <a href="/sell">Sell a Car</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h5 className="footer-heading">Follow Us</h5>
          <div className="footer-social-icons">
            <a href="https://facebook.com" aria-label="Facebook">
              <i className="fa fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h5 className="footer-heading">Contact Us</h5>
          <p className="footer-contact">
            123 CarStreet, Auto City, 56789 <br />
            Email: info@carzone.com <br />
            Phone: +1 234 567 890
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CarZone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
