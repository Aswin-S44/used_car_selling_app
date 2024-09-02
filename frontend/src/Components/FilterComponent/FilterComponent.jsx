import React, { useState } from "react";
import "./FilterComponent.css"; // Ensure to include the CSS file

function FilterComponent({ onFilterChange }) {
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    brand: "",
    year: "",
    fuelType: "",
    search: "",
  });

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
          <option value="Toyota">Toyota</option>
          <option value="Ford">Ford</option>
          <option value="Honda">Honda</option>
          {/* Add more options */}
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
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          {/* Add more options */}
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
    </div>
  );
}

export default FilterComponent;
