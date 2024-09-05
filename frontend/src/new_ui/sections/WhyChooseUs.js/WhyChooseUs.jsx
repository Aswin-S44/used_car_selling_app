import React from "react";
import "./WhyChooseUs.css"; // Ensure to include this CSS file

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: "🚗",
      title: "Wide Selection of Cars",
      description:
        "Browse through a diverse range of vehicles from various brands and models.",
    },
    {
      icon: "🔧",
      title: "Certified Quality",
      description:
        "Every car undergoes rigorous inspection to ensure top-notch quality.",
    },
    {
      icon: "💰",
      title: "Competitive Pricing",
      description: "Get the best deals and prices for your next car purchase.",
    },
    {
      icon: "🔒",
      title: "Secure Transactions",
      description:
        "We ensure safe and secure transactions with transparent processes.",
    },
  ];

  return (
    <div className="why-choose-us mt-5">
      <h2 className="section-title">Why Choose Us?</h2>
      <div className="reasons-container">
        {reasons.map((reason, index) => (
          <div key={index} className="reason-card">
            <div className={`reason-icon icon-${index}`}>{reason.icon}</div>
            <h3 className="reason-title">{reason.title}</h3>
            <p className="reason-description">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
