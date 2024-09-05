import React from "react";
import "./StatsCards.css"; // Ensure to include this CSS file

const StatsCards = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "1,200+",
      icon: "📈",
      background: "#f8d7da", // Light red background
    },
    {
      title: "Happy Customers",
      value: "1,000+",
      icon: "😊",
      background: "#d4edda", // Light green background
    },
    {
      title: "Cars Sold",
      value: "850+",
      icon: "🚗",
      background: "#d1ecf1", // Light blue background
    },
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="stats-card"
          style={{ backgroundColor: stat.background }}
        >
          <div className="card-icon">{stat.icon}</div>
          <h3 className="card-title">{stat.title}</h3>
          <p className="card-value">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
