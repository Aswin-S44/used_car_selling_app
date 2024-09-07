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
import Header from "../../new_ui/components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function DetailsScreen() {
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const [open, setOpen] = React.useState(false);

  const [cars, setCars] = useState([]);

  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  const [filters, setFilters] = useState({
    car_name: null,
    brand: null,
    model: null,
    year: null,
    kilometer: null,
    owner: null,
    shop_name: null,
    dealer: null,
    loan_available: null,
    varient: null,
    claim: null,
    sold: null,
    page: 1,
    limit: itemsPerPage, // Number of items to display per page
    search: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-cars`, {
          params: filters,
        });
        console.log("API Response:", res.data); // Debugging
        if (res && res.data) {
          setCars(res.data.data);
          console.log("RES------------", res?.data);
          setTotalPages(Math.ceil(res.data.data.length / itemsPerPage)); // Calculate total pages
          const brands = [...new Set(res.data.data.map((car) => car.brand))];
          setBrands(brands);
          const years = [...new Set(res.data.data.map((car) => car.year))];
          setYears(years);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [filters]);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/car/${id}`);
        setLoading(false);
        if (res && res.data) {
          setMainImage(res?.data?.data?.image);
          setCar(res.data.data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching car details:", error);
      }
    };
    fetchCar();
  }, [id]);

  return (
    <>
      {/* <Header /> */}
      <div className="container-fluid">
        <div className="car-detail-wrapper">
          <div className="car-detail-card">
            {loading ? (
              <Spinner />
            ) : (
              <div className="container">
                <div className="car-detail-content">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="car-detail-images">
                        <img
                          src={mainImage}
                          className="car-detail-main-image"
                          alt="Main Car"
                        />
                        <div className="car-detail-thumbnails">
                          {car?.additional_images?.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              className={`car-detail-thumbnail ${
                                mainImage === image ? "active" : ""
                              }`}
                              onClick={() => setMainImage(image)}
                              alt={`Thumbnail ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="container">
                        <div className="car-detail-info">
                          <h2 className="car-detail-title">{car?.car_name}</h2>
                          <h4 className="car-detail-subtitle">
                            {car?.brand} | {car?.model} | {car?.year}
                          </h4>
                          <p className="car-detail-meta">
                            {car?.kilometer} km | {car?.variant} | {car?.owner}{" "}
                            Owner
                          </p>

                          <h3 className="car-detail-price">
                            ₹{(car?.price / 100000).toFixed(1)} Lakh
                          </h3>
                          <p className="car-detail-location">
                            <FmdGoodIcon /> Delhi
                          </p>
                          <p className="car-detail-description">{car?.about}</p>
                          <button
                            className="car-detail-button mt-3"
                            onClick={() => setOpen(true)}
                          >
                            Get Dealer Details
                          </button>
                          <UserModal open={open} setOpen={setOpen} carId={id} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="extra-details p-3 w-100">
                    <h4 className="more-info-text">More Information</h4>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="specs">
                          <i className="fa fa-flag-checkered claim-icon"></i>
                          Insuarance Claim: <span>{car.claim ? "Yes" : "No"}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="specs">
                          <i className="fa fa-money-bill-wave loan-icon"></i>
                          Loan Available:{" "}
                          <span>{car.loan_available ? "Yes" : "No"}</span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="specs">
                          <i className="fa fa-exclamation-triangle accident-icon"></i>
                          {"  "}Major Accident:{" "}
                          <span>{car.major_accident ? "Yes" : "No"}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="specs">
                          <i className="fa fa-paint-brush color-icon"></i>
                          Color:{" "}
                          {/* <span>{car.color ? car.color : "Unavailable"}</span> */}
                          <span>Red</span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="specs">
                          <i className="fa fa-gas-pump fuel-icon"></i>
                          Fuel Type:{" "}
                          <span>
                            {car.fuelType ? car.fuelType : "Unavailable"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="related-cars-section">
            <hr />
            <CarsList title={"Related Cars"} cars={cars} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsScreen;
