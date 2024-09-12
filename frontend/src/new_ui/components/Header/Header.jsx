import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars } from "react-icons/fa";
import "./Header.css";
import SubHeader from "../SubHeader/SubHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { BACKEND_URL } from "../../../config/config";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      if (searchQuery.trim() === "") {
        setFilteredResults([]); // Reset results when the query is empty
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-cars`, {
          params: { search: searchQuery, limit: itemsPerPage, page: 1 }, // Adjust params to match the search
        });
        if (res && res.data) {
          setFilteredResults(res.data.data); // Set filtered results
          setHasMore(res.data.data.length > 0);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const delayDebounceFn = setTimeout(() => {
      fetchCars();
    }, 300); // Wait 300ms after the user stops typing

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if the user is still typing
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <>
      <SubHeader />
      <header className="header p-3">
        <div className="logo">
          <h2 className="logo-text" onClick={() => navigate("/")}>
            CarShop
          </h2>
        </div>

        {/* Full search bar for web view */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for cars, brands, etc."
            value={searchQuery}
            onChange={handleSearchChange} // Handle input change
          />
          <button className="search-button">
            <FaSearch />
          </button>
          {/* Display search results dropdown below the input */}
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
                >
                  <div key={index} className="search-result-item">
                    {car.car_name} - {car.brand} ({car.year})
                  </div>
                </a>
              ))}
            </div>
          )}
          {/* Show no results found if the list is empty and user has typed something */}
        </div>

        {/* Navigation links for larger screens */}
        <nav className="nav-links">
          <a href="/" className="active">
            Home
          </a>
          <a href="/cars">Explore cars</a>
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
        </nav>

        {/* User options and cart icon */}
        <div className="user-options">
          <a href="/my-favourites">
            <FavoriteBorderIcon className="cart-icon" />
          </a>
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
          <a href="/">Home</a>
          <a href="/cars">Explore Cars</a>
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </>
  );
}

export default Header;
