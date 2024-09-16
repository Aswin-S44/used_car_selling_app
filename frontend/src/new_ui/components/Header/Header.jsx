import React, { useEffect, useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { BACKEND_URL } from "../../../config/config";
import SubHeader from "../SubHeader/SubHeader";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      if (searchQuery.trim() === "") {
        setFilteredResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-cars`, {
          params: { search: searchQuery, limit: itemsPerPage, page: 1 },
        });
        if (res && res.data) {
          setFilteredResults(res.data.data);
          setHasMore(res.data.data.length > 0);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCars();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getNavClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      <SubHeader />
      <header className={`header p-3 ${isSticky ? "sticky" : ""}`}>
        <div className="logo">
          <img
            src="/my-logo.png"
            className="my-logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for cars, brands, etc."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button">
            <FaSearch />
          </button>
          {searchQuery && filteredResults.length === 0 && !loading && (
            <div className="search-results">
              <div className="no-results">No results found</div>
            </div>
          )}
          {searchQuery && filteredResults.length > 0 && (
            <div className="search-results">
              {filteredResults.map((car, index) => (
                <a
                  href={`/details/${car?._id}`}
                  style={{ textDecoration: "none", color: "#222" }}
                  key={index}
                >
                  <div className="search-result-item">
                    {car.car_name} - {car.brand} ({car.year})
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="nav-links">
          <a href="/" className={getNavClass("/")}>
            Home
          </a>
          <a href="/used-cars" className={getNavClass("/used-cars")}>
            Explore cars
          </a>
          <a href="/about-us" className={getNavClass("/about-us")}>
            About Us
          </a>
          <a href="/contact" className={getNavClass("/contact")}>
            Contact
          </a>
        </nav>

        <div className="user-options">
          <a href="/my-favourites">
            <FavoriteBorderIcon
              className="cart-icon"
              style={{ color: "#e34120" }}
            />
          </a>
        </div>

        <div className="mobile-icons">
          <FaSearch className="mobile-search-icon" />
          <FaBars className="hamburger-icon" onClick={toggleSidebar} />
        </div>
      </header>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <a href="/" className={getNavClass("/")}>
            Home
          </a>
          <a href="/used-cars" className={getNavClass("/used-cars")}>
            Explore Cars
          </a>
          <a href="/about-us" className={getNavClass("/about-us")}>
            About Us
          </a>
          <a href="/contact" className={getNavClass("/contact")}>
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}

export default Header;
