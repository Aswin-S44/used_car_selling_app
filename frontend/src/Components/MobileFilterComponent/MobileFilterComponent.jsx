import React, { useState } from "react";
import { Drawer, Button, IconButton, Divider } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import "./MobileFilterComponent.css";

function MobileFilterComponent({ onFilterChange }) {
  const [filters, setFilters] = useState({
    priceRange: "",
    brand: "",
    year: "",
    fuelType: "",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const priceRanges = [
    { label: "1 - 3 Lakh", value: "1-3" },
    { label: "4 - 10 Lakh", value: "4-10" },
    { label: "11 - 25 Lakh", value: "11-25" },
    { label: "Above 25 Lakh", value: "25+" },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePriceRangeChange = (range) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: range,
    }));
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: "",
      brand: "",
      year: "",
      fuelType: "",
    });
    onFilterChange({
      priceRange: "",
      brand: "",
      year: "",
      fuelType: "",
    });
  };

  return (
    <div className="mobile-filter-component">
      <button className="filter-button">
        Apply Filter
        <IconButton onClick={toggleDrawer(true)} aria-label="filter">
          <TuneIcon style={{ color: "#fff" }} />
        </IconButton>
      </button>

      <Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className="drawer-content">
          <h2 className="filter-title">Apply Filters</h2>
          <Divider />

          {/* Price Range Section with Chips */}
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
              <option value="Toyota">Toyota</option>
              <option value="Ford">Ford</option>
              <option value="Honda">Honda</option>
              {/* Add more brands as needed */}
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
              {/* Populate years dynamically or add as needed */}
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
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

          <div className="drawer-actions">
            <Button onClick={applyFilters} variant="contained" color="primary">
              Apply Filters
            </Button>
            <Button onClick={handleResetFilters} variant="text">
              Reset Filters
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default MobileFilterComponent;
