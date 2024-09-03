import React, { useEffect, useState } from "react";
import "./DetailsScreen.css";
import CarsList from "../../Sections/CarsList/CarsList";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import UserModal from "../../Components/Modal/Modal";

function DetailsScreen() {
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      let res = await axios.get(`${BACKEND_URL}/admin/car/${id}`);
      setLoading(false);
      if (res && res.data) {
        setMainImage(res?.data?.data?.image);
        setCar(res.data.data);
      }
    };
    fetchCar();
  }, [id]);

  return (
    <div>
      <div className="details-page mt-5">
        <div className="container bg-light mt-5 p-4 rounded">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="row mt-5">
                <div className="col-md-6">
                  <img
                    src={mainImage}
                    className="main-image"
                    alt="Main Car"
                  />
                  <div className="lightbox-row mt-3">
                    {car?.additional_images?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className={`lightbox-thumbnail ${
                          car?.image === image ? "active" : ""
                        }`}
                        onClick={() => setMainImage(image)}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-md-6 car-details p-3">
                  <div className="container-fluid">
                    <h4 className="brand-name">{car?.car_name}</h4>
                    <h5 className="car-info">
                      {car?.brand} | {car?.model} | {car?.year}
                    </h5>
                    <h6 className="info-2">
                      {car?.kilometer} km | {car?.variant} | {car?.owner} Owner
                    </h6>
                    {/* <h6>Shop: {car?.shop_name}</h6>
                  <h6>Dealer: {car?.dealer}</h6> */}
                    <h6>
                      Loan Available: {car?.loan_available ? "Yes" : "No"}
                    </h6>
                    <h6>
                      Insurance Claim:{" "}
                      {car?.claim ? (
                        <CheckCircleIcon className="text-success" />
                      ) : (
                        <CancelIcon className="text-danger" />
                      )}
                    </h6>
                    <h6>
                      Major Accident:{" "}
                      {car?.major_accident ? (
                        <CheckCircleIcon className="text-success" />
                      ) : (
                        <CancelIcon className="text-danger" />
                      )}
                    </h6>
                    <h3>₹{(car?.price / 100000).toFixed(1)} Lakh</h3>
                    <h6>
                      <FmdGoodIcon /> Delhi
                    </h6>
                    <p>{car?.about}</p>
                    <button
                      className="mt-3 details-btn"
                      onClick={() => setOpen(true)}
                    >
                      Get Dealer Details
                    </button>
                    {/* {open && <UserModal />} */}
                    <UserModal open={open} setOpen={setOpen} carId={id} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="container-fluid">
        <hr />
      </div>
      <div className="mt-5">
        <div className="container-fluid">
          <div>
            <CarsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsScreen;
