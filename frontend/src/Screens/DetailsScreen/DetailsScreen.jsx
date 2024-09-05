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
              <>
                <div className="car-detail-content">
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
                  <div className="car-detail-info">
                    <h2 className="car-detail-title">{car?.car_name}</h2>
                    <h4 className="car-detail-subtitle">
                      {car?.brand} | {car?.model} | {car?.year}
                    </h4>
                    <p className="car-detail-meta">
                      {car?.kilometer} km | {car?.variant} | {car?.owner} Owner
                    </p>
                    <p className="car-detail-meta">
                      Loan Available: {car?.loan_available ? "Yes" : "No"}
                    </p>
                    <p className="car-detail-meta">
                      Insurance Claim:{" "}
                      {car?.claim ? (
                        <CheckCircleIcon
                          style={{ color: "green" }}
                          className="icon-success"
                        />
                      ) : (
                        <CancelIcon className="icon-error" />
                      )}
                    </p>
                    <p className="car-detail-meta">
                      Major Accident:{" "}
                      {car?.major_accident ? (
                        <CheckCircleIcon
                          style={{ color: "red" }}
                          className="icon-success"
                        />
                      ) : (
                        <CancelIcon className="icon-error" />
                      )}
                    </p>
                    <h3 className="car-detail-price">
                      ₹{(car?.price / 100000).toFixed(1)} Lakh
                    </h3>
                    <p className="car-detail-location">
                      <FmdGoodIcon /> Delhi
                    </p>
                    <p className="car-detail-description">{car?.about}</p>
                    <button
                      className="car-detail-button"
                      onClick={() => setOpen(true)}
                    >
                      Get Dealer Details
                    </button>
                    <UserModal open={open} setOpen={setOpen} carId={id} />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="related-cars-section">
            <hr />
            <CarsList title={"Related Cars"} cars={cars} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailsScreen;
