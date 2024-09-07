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
import SearchIcon from "@mui/icons-material/Search";

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
  const [hasMore, setHasMore] = useState(true);
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
        if (res && res.data) {
          const newCars = res?.data?.data;
          if (newCars) {
            setCars((prevCars) => [...prevCars, ...newCars]);
            const totalItems = res.data.totalCars;
            setTotalPages(Math.ceil(totalItems / itemsPerPage));
            setHasMore(newCars.length > 0 && cars.length < totalItems);
            setBrands([...new Set(res.data.data.map((car) => car.brand))]);
            setYears([...new Set(res.data.data.map((car) => car.year))]);
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
    setCars([]);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
      page: 1,
    }));
  };

  const handleSearchChange = (e) => {
    console.log("search avlue : ", e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("submit called-------");
    setCars([]);
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
                  {/* <i
                    className="fa fa-search search-icon"
                    onClick={handleSearchSubmit}
                    role="button"
                    tabIndex="0"
                    style={{ cursor: "pointer" }}
                  ></i> */}
                  <button onClick={handleSearchSubmit}>
                    <span style={{fontSize:'15px'}}>Search</span>
                  </button>
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
