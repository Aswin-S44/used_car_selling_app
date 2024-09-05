import React, { useEffect, useState } from "react";
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
  const itemsPerPage = 6; // Number of items to display per page

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
    limit: itemsPerPage, // Number of items to display per page
    search: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-cars`, {
          params: filters,
        });
        console.log("API Response:", res.data); // Debugging
        if (res && res.data) {
          setCars(res.data.data);
          console.log("RES------------", res?.data);
          setTotalPages(Math.ceil(res.data.data.length / itemsPerPage)); // Calculate total pages
          const brands = [...new Set(res.data.data.map((car) => car.brand))];
          setBrands(brands);
          const years = [...new Set(res.data.data.map((car) => car.year))];
          setYears(years);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [filters]); // Re-fetch cars when filters change

  const handleFilterChange = (updatedFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
      page: 1, // Reset to the first page on filter change
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: searchQuery,
      page: 1, // Reset to the first page on search
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Validate page range
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Header />
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
              {currentPath == "/cars" && (
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
                <>
                  <CarsList title={'Popular Sales'} cars={cars} />
                  {/* <div className="pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div> */}
                </>
              ) : (
                <NotFound />
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "80px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default AllCars;
