import React, { useState, useEffect } from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  // Get the current pathname
  const currentPath = location.pathname;

  // Log the current path or use it in your logic
  console.log("Current URL path:", currentPath);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-logo">
        <a href="/" className="brand">
          <img src="/brand.png" className="brand-logo" />
        </a>
      </div>
      <nav className={`header-nav ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a
              onClick={() => {
                if (currentPath == "/cars") {
                  window.location.href = "/#about";
                } else {
                  handleScrollToSection("about");
                }
              }}
            >
              About
            </a>
          </li>
          <li>
            <a href="/cars">Cars</a>
          </li>
          <li>
            <a
              onClick={() => {
                if (currentPath == "/cars") {
                  window.location.href = "/#contact";
                } else {
                  handleScrollToSection("contact");
                }
              }}
            >
              Contact
            </a>
          </li>
          <li>
            <a href="#contact">
              <button className="intro_btn">Sell a Car</button>
            </a>
          </li>
        </ul>

        {isOpen && (
          <div className="header-close-icon" onClick={toggleMenu}>
            &times;
          </div>
        )}
      </nav>
      <div className="header-menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}

export default Header;
