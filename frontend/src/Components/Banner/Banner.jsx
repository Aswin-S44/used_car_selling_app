import React from "react";
import "./Banner.css";
import { BANNER_IMAGE } from "../../constants/urls";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigation = useNavigate();
  return (
    <div className="banner-container">
      <img src={BANNER_IMAGE} alt="Car" className="w-100 banner-image" />
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h1 className="banner-title">Discover the Ultimate Drive</h1>
        <p className="banner-subtitle">
          Discover unmatched luxury and performance with our curated selection
          of premium used cars. Experience the perfect blend of elegance and
          power, designed to elevate every drive to a new level of
          sophistication.
        </p>
        <button
          onClick={() => {
            navigation("/used-cars");
          }}
          className="banner-button"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
