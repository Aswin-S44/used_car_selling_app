import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner-container">
      <img
        src="https://mclaren.scene7.com/is/image/mclaren/720S-Spider-Wallpapers-1-1920x1080:crop-16x9?wid=1600&hei=900"
        alt="Car"
        className="banner-image"
      />
      <div className="banner-content">
        <h1 className="banner-title">Discover the Ultimate Drive</h1>
        <p className="banner-subtitle">
          Discover unmatched luxury and performance with our curated selection
          of premium used cars. Experience the perfect blend of elegance and
          power, designed to elevate every drive to a new level of
          sophistication.
        </p>
        <button className="banner-button">Explore Now</button>
      </div>
    </div>
  );
}

export default Banner;
