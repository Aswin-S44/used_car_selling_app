import React, { useState } from "react";
import "./FilterComponent.css";

function FilterComponent({ brands, years, onFilterChange }) {
  const initialFilters = {
    priceRange: "",
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

  const handlePriceRangeChange = (range) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, priceRange: range };
      onFilterChange(updatedFilters); // Notify parent of filter change
      return updatedFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters); // Notify parent of filter reset
  };

  const priceRanges = [
    { label: "1 - 3 Lakh", value: "1-3" },
    { label: "4 - 10 Lakh", value: "4-10" },
    { label: "11 - 25 Lakh", value: "11-25" },
    { label: "Above 25 Lakh", value: "25+" },
  ];

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
        <div className="price-chip-container">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              className={`price-chip ${
                filters.priceRange === range.value ? "active" : ""
              }`}
              onClick={() => handlePriceRangeChange(range.value)}
            >
              {range.label}
            </button>
          ))}
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
        </select>
      </div>

      <button onClick={handleResetFilters} className="reset-button">
        Reset Filters
      </button>
    </div>
  );
}

export default FilterComponent;
