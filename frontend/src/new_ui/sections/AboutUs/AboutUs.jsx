import React from "react";
import { FaHandshake, FaCheckCircle, FaAward } from "react-icons/fa";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Welcome to <span className="brand-name">WheelzLoop</span>, your
          trusted partner in buying and selling used cars. We bring
          transparency, convenience, and trust to the used car market, helping
          you find the perfect car that fits your needs and budget.
        </p>

        <div className="features">
          <div className="feature-item">
            <div className="feature-icon">
              <FaHandshake size={50} color="#e34120" />
            </div>
            <h3 className="feature-title">Trusted Services</h3>
            <p className="feature-description">
              We offer reliable and transparent services to ensure a smooth
              buying and selling experience.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <FaCheckCircle size={50} color="#e34120" />
            </div>
            <h3 className="feature-title">Quality Assurance</h3>
            <p className="feature-description">
              All our cars undergo thorough inspections to guarantee quality and
              performance.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <FaAward size={50} color="#e34120" />
            </div>
            <h3 className="feature-title">Customer Satisfaction</h3>
            <p className="feature-description">
              Your satisfaction is our priority. We strive to meet and exceed
              your expectations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
