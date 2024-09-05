import React, { useState } from "react";
import "./ListCars.css"; // Import the CSS for styling
import { carsData } from "../data";

function ListCars() {
    const [cars,setCars] = useState(carsData)
  return (
    <div className="list-cars">
      <header className="list-cars-header">
        <h1>Available Cars</h1>
      </header>
      <div className="list-cars-grid">
        {cars.map((car) => (
          <div className="car-card" key={car._id}>
            <img
              src={car.image}
              alt={car.car_name}
              className="car-card-image"
            />
            <div className="car-card-content">
              <h2 className="car-card-title">{car.car_name}</h2>
              <p className="car-card-brand">
                {car.brand} - {car.model}
              </p>
              <p className="car-card-year">Year: {car.year}</p>
              <p className="car-card-price">₹{car.price.toLocaleString()}</p>
              {/* <p className="car-card-about">{car.about}</p> */}
              <button className="car-card-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListCars;
