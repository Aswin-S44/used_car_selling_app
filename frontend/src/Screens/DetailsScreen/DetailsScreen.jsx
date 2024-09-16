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
import CustomerReviews from "../../Sections/CustomerReviews/CustomerReviews";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetailsScreen() {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [dealerId, setDealerId] = useState("all");
  const [reviews, setReviews] = useState([]);

  const [cars, setCars] = useState([]);

  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const addToFavourites = (car) => {
    let favouriteCars =
      JSON.parse(localStorage.getItem("favourite_cars")) || [];

    const isFavorite = favouriteCars.some((item) => item._id === car._id);

    if (isFavorite) {
      favouriteCars = favouriteCars.filter((item) => item._id !== car._id);
      localStorage.setItem("favourite_cars", JSON.stringify(favouriteCars));
      setIsFavorite(false);
      toast.error("Car removed from favourites!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      favouriteCars.push(car);
      localStorage.setItem("favourite_cars", JSON.stringify(favouriteCars));
      setIsFavorite(true);
      toast.success("Car added to favourites!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    let favouriteCars =
      JSON.parse(localStorage.getItem("favourite_cars")) || [];

    if (car) {
      const isFavorite = favouriteCars.some((item) => item._id === car._id);

      setIsFavorite(isFavorite);
    }
  }, [car, addToFavourites]);

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
    limit: itemsPerPage,
    search: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/get-cars`, {
          params: filters,
        });

        if (res && res.data) {
          setCars(res.data.data);

          setTotalPages(Math.ceil(res.data.data.length / itemsPerPage));
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
          let dealer_id = res?.data?.data?.dealer;
          if (dealer_id) {
            let resp = await axios.get(
              `${BACKEND_URL}/customer/get-reviews?dealerId=${dealer_id}`
            );
            if (resp && resp.status == 200) {
              setReviews(resp?.data);
            }
          }
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
      <div className="container-fluid">
        <ToastContainer />
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
                        <div style={{ float: "right" }}>
                          <BookmarkBorderIcon
                            onClick={() => addToFavourites(car)}
                            style={{ color: isFavorite && "orange" }}
                          />
                        </div>
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
                          <h5 style={{ color: "green", fontSize: "17px" }}>
                            Negotiable
                          </h5>
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
                      <div className="container-fluid">
                        <div className="extra-details mt-5 p-3 w-100">
                          <h4 className="more-info-text">More Information</h4>
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <div className="specs">
                                <i className="fa fa-flag-checkered claim-icon"></i>
                                Insuarance Claim:{"  "}
                                <span>{car?.claim ? "Yes" : "No"}</span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="specs">
                                <i className="fa fa-money-bill-wave loan-icon"></i>
                                Loan Available:{" "}
                                <span>
                                  {car?.loan_available ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="specs">
                                <i className="fa fa-exclamation-triangle accident-icon"></i>
                                {"  "}Major Accident:{" "}
                                <span>
                                  {car?.major_accident ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="specs">
                                <i className="fa fa-paint-brush color-icon"></i>
                                Color: <span>Red</span>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="specs">
                                <i className="fa fa-gas-pump fuel-icon"></i>
                                Fuel Type:{" "}
                                <span>
                                  {car?.fuelType ? car.fuelType : "Unavailable"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mt-4">
                      <h6>Reviews ({reviews?.length})</h6>
                      <div className="mt-3">
                        {reviews.length == 0 ? (
                          <p>No reviews Available</p>
                        ) : (
                          <CustomerReviews reviews={reviews} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="related-cars-section">
          <hr />
          <CarsList title={"Related Cars"} cars={cars} />
        </div>
      </div>
    </>
  );
}

export default DetailsScreen;
