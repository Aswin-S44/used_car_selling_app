import React, { useEffect, useState } from "react";
import "./CarsList.css";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";

function CarsList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);

      let res = await axios.get(`${BACKEND_URL}/admin/get-cars`);
      setLoading(false);
      if (res && res.data) {
        setCars(res?.data?.data);
      }
    };
    fetchCars();
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="mt-4" style={{ textAlign: "center" }}>
          Popular Sales
        </h2>
      </div>
      <div className="cars-list mt-0">
        {cars.map((car) => (
          <div
            key={car?._id}
            className="car-card"
            onClick={() => (window.location.href = `/details/${car?._id}`)}
          >
            <div className="container-fluid">
              <img src={car.image} alt={car.name} className="w-100" style={{height:'200px'}} />
            </div>
            <div className="car-details">
              <h3 className="car-name">{car?.car_name}</h3>
              <p className="car-kilometers">Kilometers: {car?.kilometer}</p>
              <p className="car-price">Price: {car?.price}</p>
              <button className="car-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CarsList;
