import React, { useEffect, useState, useCallback } from "react";
import "./AllCars.css";
import CarsList from "../../Sections/CarsList/CarsList";
import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import useDeviceType from "../../utils";
import MobileFilterComponent from "../../Components/MobileFilterComponent/MobileFilterComponent";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import Spinner from "../../Components/Spinner/Spinner";
import NotFound from "../../Components/NotFound/NotFound";
import { useLocation } from "react-router-dom";
import Header from "../../new_ui/components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function AllCars() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useDeviceType();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    car_name: null,
    brand: null,
    model: null,
    year: null,
    kilometer: null,
    owner: null,
    shop_name: null,
    dealer: null,
    loan_available: null,
    varient: null,
    claim: null,
    sold: null,
    page: 1,
    limit: itemsPerPage,
    search: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-cars`, {
          params: filters,
        });
        console.log("API Response:", res.data);
        if (res && res.data) {
          const newCars = res?.data?.data;

          if (newCars) {
            setCars((prevCars) => [...prevCars, ...newCars]); // Append new cars to the existing ones
            const totalItems = res.data.totalCars;
            setTotalPages(Math.ceil(totalItems / itemsPerPage));
            setHasMore(newCars.length > 0 && cars.length < totalItems); // Determine if more data is available

            const brands = [...new Set(res.data.data.map((car) => car.brand))];
            setBrands(brands);
            const years = [...new Set(res.data.data.map((car) => car.year))];
            setYears(years);
          }
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [filters]);

  const handleFilterChange = (updatedFilters) => {
    setCars([]); // Reset the car list when filters change
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
      page: 1,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    setCars([]); // Reset the car list on new search
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: searchQuery,
      page: 1,
    }));
  };

  const loadMoreCars = () => {
    if (hasMore) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: prevFilters.page + 1,
      }));
    }
  };

  // Scroll event listener to load more cars when the user scrolls near the bottom
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      loadMoreCars();
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <div className="cars-list">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              {!isMobile ? (
                <FilterComponent
                  brands={brands}
                  years={years}
                  onFilterChange={handleFilterChange}
                />
              ) : (
                <MobileFilterComponent onFilterChange={handleFilterChange} />
              )}
            </div>
            <div className="col-md-9">
              {currentPath === "/cars" && (
                <div className="search-container">
                  <input
                    type="search"
                    placeholder="Search by car name, brand, etc."
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <i
                    className="fa fa-search search-icon"
                    onClick={handleSearchSubmit}
                  ></i>
                </div>
              )}
              {loading ? (
                <Spinner />
              ) : cars.length > 0 ? (
                <CarsList title={"Popular Sales"} cars={cars} />
              ) : (
                <NotFound />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCars;
