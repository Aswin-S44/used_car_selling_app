import React, { useState } from "react";
import "./HeaderWithMegaDropdown.css"; // Import custom CSS

const HeaderWithDropdowns = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="flipkart-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <a href="/">CarMax</a>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-items">
            <li
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("brands")}
              onMouseLeave={handleMouseLeave}
            >
              Brands
              {activeDropdown === "brands" && (
                <div className="dropdown">
                  <ul>
                    <li>Tata</li>
                    <li>Toyota</li>
                    <li>Honda</li>
                    <li>BMW</li>
                    <li>Audi</li>
                  </ul>
                </div>
              )}
            </li>

            <li
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("categories")}
              onMouseLeave={handleMouseLeave}
            >
              Categories
              {activeDropdown === "categories" && (
                <div className="dropdown">
                  <ul>
                    <li>Luxury</li>
                    <li>Mid-range</li>
                    <li>Economy</li>
                    <li>SUV</li>
                    <li>Electric</li>
                  </ul>
                </div>
              )}
            </li>

            <li
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("fuelTypes")}
              onMouseLeave={handleMouseLeave}
            >
              Fuel Types
              {activeDropdown === "fuelTypes" && (
                <div className="dropdown">
                  <ul>
                    <li>Petrol</li>
                    <li>Diesel</li>
                    <li>Electric</li>
                    <li>Hybrid</li>
                  </ul>
                </div>
              )}
            </li>

            <li
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("priceRange")}
              onMouseLeave={handleMouseLeave}
            >
              Price Range
              {activeDropdown === "priceRange" && (
                <div className="dropdown">
                  <ul>
                    <li>Below $10,000</li>
                    <li>$10,000 - $20,000</li>
                    <li>$20,000 - $50,000</li>
                    <li>Above $50,000</li>
                  </ul>
                </div>
              )}
            </li>

            <li
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("locations")}
              onMouseLeave={handleMouseLeave}
            >
              Locations
              {activeDropdown === "locations" && (
                <div className="dropdown">
                  <ul>
                    <li>New York</li>
                    <li>Los Angeles</li>
                    <li>Chicago</li>
                    <li>Miami</li>
                    <li>Houston</li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderWithDropdowns;
