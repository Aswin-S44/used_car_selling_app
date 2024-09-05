import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import "./Header.css";
import SubHeader from "../SubHeader/SubHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SubHeader />
      <header className="header p-3">
        <div className="logo">
          <h2 className="logo-text">CarShop</h2>
        </div>

        {/* Full search bar for web view */}
        <div className="search-bar">
          <input type="text" placeholder="Search for cars, brands, etc." />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        {/* Navigation links for larger screens */}
        <nav className="nav-links">
          <a href="/home" className="active">
            Home
          </a>
          <a href="/cars">Cars</a>
          <a href="/brands">Brands</a>
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
        </nav>

        {/* User options and cart icon */}
        <div className="user-options">
          {/* <FaUserCircle className="user-icon" /> */}
          <FavoriteBorderIcon className="cart-icon" />
        </div>

        {/* Mobile search and hamburger icon */}
        <div className="mobile-icons">
          <FaSearch className="mobile-search-icon" />
          <FaBars className="hamburger-icon" onClick={toggleSidebar} />
        </div>
      </header>

      {/* Sidebar for mobile view */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <a href="/home">Home</a>
          <a href="/cars">Cars</a>
          <a href="/brands">Brands</a>
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </>
  );
}

export default Header;
