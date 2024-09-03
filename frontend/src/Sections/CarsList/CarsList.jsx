import React, { useEffect, useState } from "react";
import "./CarsList.css";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";

function CarsList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        let res = await axios.get(`${BACKEND_URL}/admin/get-cars`);
        if (res && res.data) {
          setCars(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="cars-header">
          <h2 className="header-title">Popular Sales</h2>
          <button className="view-all-button" onClick={() => navigate("/cars")}>
            Explore All
          </button>
        </div>
      </div>
      <div className="cars-list">
        {cars.map((car) => (
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
              <p className="car-price">Price: ${car?.price.toLocaleString()}</p>
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
