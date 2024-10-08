import React, { useEffect, useState } from "react";
import "./CarsList.css";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";

function CarsList({ title, cars }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="cars-list">
        {cars &&
          cars?.map((car) => (
            <div
              key={car?._id}
              className="car-card"
              onClick={() => navigate(`/details/${car?._id}`)}
            >
              <div className="car-image-container">
                <img src={car.image} alt={car.name} className="car-image" />
              </div>
              <div className="car-details">
                <h3 className="car-name">{car?.car_name}</h3>
                <p className="car-model">Model: {car?.model}</p>
                <p className="car-year">Year: {car?.year}</p>
                <p className="car-price">
                  Price: ${car?.price.toLocaleString()}
                </p>
                <p className="car-description">
                  {car?.about?.length > 100
                    ? car?.about?.substring(0, 100) + "..."
                    : car?.about}
                </p>
                <button className="car-button">View Details</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default CarsList;
