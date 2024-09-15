import React from "react";
import "./Carousel.css";

function Carousel() {
  return (
    <div className="banner-div">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://t3.ftcdn.net/jpg/04/60/44/42/360_F_460444211_E7j3njYE705Rk1guKz9LKh58gFgiTybV.jpg"
              className="d-block w-100"
              alt="..."
              style={{ maxHeight: "600px", borderRadius: "10px" }}
            />
            <div className="carousel-caption custom-caption">
              <h5>Find Your Perfect Ride</h5>
              <p>
                Explore a wide selection of certified pre-owned cars, all
                inspected and ready to hit the road. Quality and reliability
                guaranteed.
              </p>
              <button className="custom-button">Learn More</button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/05/09/64/26/360_F_509642664_iJnbo6Nbv8WDn29YkIXToqT0FAyyxgDD.jpg"
              className="d-block w-100"
              alt="..."
              style={{ maxHeight: "600px", borderRadius: "10px" }}
            />
            <div className="carousel-caption custom-caption">
              <h5>Drive Home a Great Deal</h5>
              <p>
                Unlock unbeatable prices on top brands. Drive your dream car
                without breaking the bank!
              </p>
              <button className="custom-button">Learn More</button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/01/92/82/18/360_F_192821860_j9uFPdtqhorMYomb5OfMxfJOhoPONJXx.jpg"
              className="d-block w-100"
              alt="..."
              style={{ maxHeight: "600px", borderRadius: "10px" }}
            />
            <div className="carousel-caption custom-caption">
              <h5>Hassle-Free Car Buying</h5>
              <p>
                Buy with confidence and convenience. Our transparent process
                makes buying a used car easier than ever
              </p>
              <button className="custom-button">Learn More</button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
