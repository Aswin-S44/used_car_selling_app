import React, { useState } from "react";
import "./FilterComponent.css"; // Ensure to include the CSS file

function FilterComponent({ brands, years, onFilterChange }) {
  const initialFilters = {
    priceRange: [0, 100000],
    brand: "",
    year: "",
    fuelType: "",
    search: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      onFilterChange(updatedFilters); // Notify parent of filter change
      return updatedFilters;
    });
  };

  const handlePriceRangeChange = (index, value) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = value;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, priceRange: newPriceRange };
      onFilterChange(updatedFilters); // Notify parent of filter change
      return updatedFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters); // Notify parent of filter reset
  };

  return (
    <div className="filter-component">
      <h2 className="filter-title">Filter Options</h2>
      <div className="filter-group">
        <label htmlFor="search">Search by model</label>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Enter model..."
          value={filters.search}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-range">
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceRangeChange(0, e.target.value)}
            className="range-slider"
          />
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceRangeChange(1, e.target.value)}
            className="range-slider"
          />
        </div>
        <div className="price-values">
          <span>${filters.priceRange[0]}</span> -{" "}
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
      <div className="filter-group">
        <label htmlFor="brand">Brand</label>
        <select
          id="brand"
          name="brand"
          value={filters.brand}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Brands</option>
          {brands?.length > 0 &&
            brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="year">Year</label>
        <select
          id="year"
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Years</option>
          {years?.length > 0 &&
            years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="fuelType">Fuel Type</label>
        <select
          id="fuelType"
          name="fuelType"
          value={filters.fuelType}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          {/* Add more options */}
        </select>
      </div>
      <button onClick={handleResetFilters} className="reset-button">
        Reset Filters
      </button>
    </div>
  );
}

export default FilterComponent;
