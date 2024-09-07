import React from "react";
import "./Carousel.css";

function Carousel() {
  return (
    <div className="banner-div">
      <div
        id="carouselExampleAutoplaying"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://t3.ftcdn.net/jpg/04/60/44/42/360_F_460444211_E7j3njYE705Rk1guKz9LKh58gFgiTybV.jpg"
              class="d-block w-100"
              alt="..."
              style={{ maxHeight: "600px", borderRadius: "10px" }}
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/05/09/64/26/360_F_509642664_iJnbo6Nbv8WDn29YkIXToqT0FAyyxgDD.jpg"
              class="d-block w-100"
              alt="..."
              style={{ maxHeight: "600px", borderRadius: "10px" }}
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://t3.ftcdn.net/jpg/01/92/82/18/360_F_192821860_j9uFPdtqhorMYomb5OfMxfJOhoPONJXx.jpg"
              class="d-block w-100"
              alt="..."
              style={{ maxHeight: "600px", borderRadius: "10px" }}
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
