import React, { useEffect, useState } from "react";
// import "react-image-lightbox/style.css"; // import lightbox styles
// import Lightbox from "react-image-lightbox";
import "./ViewDetails.css";
import axios from "axios";
import { BACKEND_URL } from "../../../config/config";

function ViewDetails({ carId, onBack }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      let res = await axios.get(`${BACKEND_URL}/admin/car/${carId}`);
      setLoading(false);
      if (res && res.data) {
        setCar(res.data.data);
      }
    };
    fetchCar();
  }, []);

  if (!car) {
    return <div>Car not found</div>;
  }

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <div className="view-details">
      <div className="container">
        <button onClick={onBack} className="btn btn-secondary">
          Back
        </button>
        <div className="details-card">
          <div className="row">
            <div className="col-md-6">
              <img src={car?.image} alt="Main" className="main-image" />
              <div className="additional-images">
                {car?.additional_images?.length > 0 &&
                  car?.additional_images?.map((add, index) => (
                    <img
                      key={index}
                      src={add}
                      alt={`Additional ${index}`}
                      className="thumbnail"
                      onClick={() => openLightbox(index)}
                    />
                  ))}
              </div>
            </div>
            <div className="col-md-6">
              <h2>Car Details</h2>
              <p>
                <strong>Name:</strong> {car.car_name}
              </p>
              <p>
                <strong>Brand:</strong> {car.brand}
              </p>
              <p>
                <strong>Model:</strong> {car.model}
              </p>
              <p>
                <strong>Year:</strong> {car.year}
              </p>
              <p>
                <strong>Kilometer:</strong> {car.kilometer}
              </p>
              <p>
                <strong>Variant:</strong> {car.varient}
              </p>
              <p>
                <strong>Owner:</strong> {car.owner}
              </p>
              <p>
                <strong>Claim:</strong> {car.claim ? "Yes" : "No"}
              </p>
              <p>
                <strong>Major Accident:</strong>{" "}
                {car.major_accident ? "Yes" : "No"}
              </p>
              <p>
                <strong>Shop Name:</strong> {car.shop_name}
              </p>
              <p>
                <strong>Loan Available:</strong>{" "}
                {car.loan_available ? "Yes" : "No"}
              </p>
              <p>
                <strong>Dealer:</strong> {car.dealer}
              </p>
              <p>
                <strong>About:</strong> {car.about}
              </p>
              <p>
                <strong>Sold:</strong> {car.sold ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
