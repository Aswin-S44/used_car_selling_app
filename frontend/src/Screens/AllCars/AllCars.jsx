import React from "react";
import "./AllCars.css";
import CarsList from "../../Sections/CarsList/CarsList";
import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import useDeviceType from "../../utils";
import MobileFilterComponent from "../../Components/MobileFilterComponent/MobileFilterComponent";

function AllCars() {
  const isMobile = useDeviceType();
  const handleFilterChange = (filters) => {
    console.log('Filters applied:', filters);
  };
  return (
    <div className="cars-list">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            {!isMobile ? (
              <FilterComponent onFilterChange={() => {}} />
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
            <CarsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCars;
