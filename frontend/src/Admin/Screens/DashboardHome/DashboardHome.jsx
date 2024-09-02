import React from "react";
import "./DashboardHome.css";

function DashboardHome() {
  return (
    <div className="dashboard-home">
      <h2>Admin Dashboard Overview</h2>

      <div className="summary-cards">
        <div className="card total-cars">
          <h3>Total Cars Listed</h3>
          <p>120</p>
        </div>
        <div className="card active-dealers">
          <h3>Active Dealers</h3>
          <p>25</p>
        </div>
        <div className="card recent-sales">
          <h3>Recent Sales</h3>
          <p>15 This Week</p>
        </div>
        <div className="card pending-approvals">
          <h3>Pending Approvals</h3>
          <p>8</p>
        </div>
      </div>

      <div className="extended-options">
        <div className="option-card monthly-report">
          <h3>Monthly Sales Report</h3>
          <p>$12,340</p>
        </div>
        <div className="option-card top-selling-cars">
          <h3>Top Selling Cars</h3>
          <ul>
            <li>Car Model X</li>
            <li>Car Model Y</li>
            <li>Car Model Z</li>
          </ul>
        </div>
        <div className="option-card upcoming-appointments">
          <h3>Upcoming Appointments</h3>
          <ul>
            <li>Dealer A - 3 PM</li>
            <li>Dealer B - 5 PM</li>
            <li>Dealer C - 7 PM</li>
          </ul>
        </div>
        <div className="option-card system-notifications">
          <h3>System Notifications</h3>
          <ul>
            <li>New feature release scheduled</li>
            <li>System maintenance on Friday</li>
          </ul>
        </div>
        <div className="option-card recent-feedback">
          <h3>Recent Feedback</h3>
          <ul>
            <li>"Great interface!" - User A</li>
            <li>"Needs more features." - User B</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
