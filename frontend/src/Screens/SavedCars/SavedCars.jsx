import React, { useState, useEffect } from "react";
import "./SavedCars.css";

const SavedCars = () => {
  const [savedCars, setSavedCars] = useState([]);

  useEffect(() => {
    const fetchSavedCars = () => {
      const favouriteCars =
        JSON.parse(localStorage.getItem("favourite_cars")) || [];
      setSavedCars(favouriteCars);
    };

    fetchSavedCars();
  }, []);

  const handleRemoveFromFavorites = (id) => {
    const updatedCars = savedCars.filter((car) => car._id !== id);
    localStorage.setItem("favourite_cars", JSON.stringify(updatedCars));
    setSavedCars(updatedCars);
  };

  return (
    <div className="container mt-4">
      <div className="saved-cars-list-page">
        <h2 className="saved-cars-list-title">Your Favourites</h2>
        <ul className="saved-cars-list">
          {savedCars.length > 0 ? (
            savedCars.map((car) => (
              <li key={car._id} className="saved-car-item">
                <img
                  src={car.image}
                  alt={car.car_name}
                  className="saved-car-image"
                />
                <div className="saved-car-details">
                  <h3 className="saved-car-name">{car.car_name}</h3>
                  <p className="saved-car-info">
                    {car.year} | {car.kilometer} km
                  </p>
                  <p className="saved-car-price">
                    ₹{car.price.toLocaleString()}
                  </p>
                  <button
                    className="saved-car-remove-btn"
                    onClick={() => handleRemoveFromFavorites(car._id)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No saved cars found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SavedCars;
