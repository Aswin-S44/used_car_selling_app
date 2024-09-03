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

function AllCars() {
  const isMobile = useDeviceType();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);

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
    limit: 10,
  });

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-cars`, {
          params: filters,
        });
        if (res && res.data) {
          setCars(res.data.data);
          const brands = [...new Set(res?.data?.data?.map((car) => car.brand))];
          setBrands(brands);
          const years = [...new Set(res?.data?.data?.map((car) => car.year))];
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
    }));
  };

  return (
    <div className="cars-list">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            {!isMobile ? (
              <FilterComponent
                brands={brands}
                years={years}
                onFilterChange={handleFilterChange}
              />
            ) : (
              <>
                <MobileFilterComponent onFilterChange={handleFilterChange} />
              </>
            )}
          </div>
          <div className="col-md-8">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search..."
                className="search-input"
              />
              <i className="fa fa-search search-icon"></i>
            </div>
            {loading ? (
              <Spinner />
            ) : cars.length > 0 ? (
              <CarsList cars={cars} />
            ) : (
              <>
                <NotFound />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCars;
