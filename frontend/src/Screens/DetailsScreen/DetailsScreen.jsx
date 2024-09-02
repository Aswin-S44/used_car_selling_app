import React, { useEffect, useState } from "react";
import "./DetailsScreen.css";
import CarsList from "../../Sections/CarsList/CarsList";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { useParams } from "react-router-dom";

function DetailsScreen() {
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      let res = await axios.get(`${BACKEND_URL}/admin/car/${id}`);
      setLoading(false);
      if (res && res.data) {
        setCar(res.data.data);
      }
    };
    fetchCar();
  }, []);

  return (
    <div>
      <div className="details-page mt-5">
        <div className="container bg-light mt-5">
          <div className="row">
            <div className="col-md-6">
              <img
                src={car?.image}
                className="w-100 main-image"
                alt="Main Car"
              />
              <div className="lightbox-row">
                {car?.additional_images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    className={`lightbox-thumbnail ${
                      car?.image === image ? "active" : ""
                    }`}
                    // onClick={() => setMainImage(image)}
                    alt={`Thumbnail ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-6 car-details">
              <h4 className="brand-name">{car?.car_name}</h4>
              <h6>{car?.kilometer} km | Diesel Automatic | </h6>
              <h5>Ownership : {car?.owner} Owner</h5>
              <h3>51 Lakh</h3>
              <h6>Delhi </h6>
              <button className="mt-3">Get Dealer Details</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <hr />
      </div>
      {/* <div className="mt-5">
        <div className="container-fluid">
          <div className="">
            <CarsList />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default DetailsScreen;
