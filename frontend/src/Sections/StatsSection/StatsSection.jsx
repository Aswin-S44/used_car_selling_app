import React from "react";
import CountUp from "react-countup";
import "./StatsSection.css";

const stats = [
  { label: "Satisfied Customers", count: 1000, suffix: "+", color: "#28a745" },
  { label: "Cars Sold", count: 10000, suffix: "+", color: "#007bff" },
  { label: "Special Offers", count: 10, suffix: "%", color: "#dc3545" },
];

const StatsSection = () => {
  return (
    <section className="stats-section">
      <h2 className="section-title">Our Achievements</h2>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stats-item" key={index}>
            <div className="stats-icon" style={{ color: stat.color }}>
              <i
                className={`fas fa-tachometer-alt`}
                style={{ fontSize: "36px" }}
              ></i>
            </div>
            <h3 className="stats-count" style={{ color: stat.color }}>
              <CountUp end={stat.count} duration={2} />
              {stat.suffix}
            </h3>
            <p className="stats-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
