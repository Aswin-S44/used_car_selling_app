import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import TwitterIcon from "@mui/icons-material/Twitter";
import XIcon from "@mui/icons-material/X";
import "./Footer.css"; // Ensure to include this CSS file
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/my-logo.png" className="footer-logo" />
          <p>Your trusted partner in buying and selling cars.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/used-cars">Explore Cars</a>
            </li>

            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/contact">Sell a Car</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          {/* <p>Email: wheelzloop@gmail.com</p> */}
          <p>
            <a
              href="mailto:wheelzloop@gmail.com"
              style={{ textDecoration: "none !important", color: "#333" }}
            >
              Email: wheelzloop@gmail.com
            </a>
          </p>

          <p>
            <XIcon /> :{" "}
            <a
              href="https://x.com/WheelzLoop"
              style={{ textDecoration: "none", color: "#333" }}
            >
              https://x.com/WheelzLoop
            </a>
          </p>
          {/* <p>Address: 123 Car Street, Auto City, AC 12345</p> */}
        </div>
        <div className="footer-newsletter">
          {/* <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form> */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Wheelzloop. All rights reserved.
        </p>
        <div className="footer-socials">
          <a
            href="https://www.facebook.com/profile.php?id=61565890412918"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.youtube.com/@wheelzloop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon />
          </a>
          <a
            href="https://www.instagram.com/wheelz_loop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/WheelzLoop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
