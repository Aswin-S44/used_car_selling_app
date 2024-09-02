import React, { useState } from "react";
import AdminHeader from "../Components/AdminHeader/AdminHeader";
import DashboardHome from "../Screens/DashboardHome/DashboardHome";
import MyCars from "../Screens/MyCars/MyCars";
import ViewDetails from "../Screens/ViewDetails/ViewDetails";
import EditCar from "../Screens/EditCar/EditCar";
import AddCar from "../Screens/AddCar/AddCar";
import Dealers from "../Screens/Dealers/Dealers";
import "./Dashboard.css";

function Dashboard() {
  const [activePage, setActivePage] = useState("Home");
  const [selectedCar, setSelectedCar] = useState(null);
  const [editMode, setEditMode] = useState(false); // To track if we are in edit mode
  const [addCarMode, setAddCarMode] = useState(false); // To track if we are adding a new car

  const handleViewDetails = (carId) => {
    setSelectedCar(carId);
    setActivePage("CarDetails");
  };

  const handleEditCar = (carId) => {
    setSelectedCar(carId);
    setEditMode(true);
    setActivePage("EditCar");
  };

  const handleAddCar = () => {
    setAddCarMode(true);
    setActivePage("AddCar");
  };

  const handleBackToCars = () => {
    setSelectedCar(null);
    setEditMode(false);
    setAddCarMode(false);
    setActivePage("Cars");
  };

  const renderContent = () => {
    if (activePage === "Home") return <DashboardHome />;
    if (activePage === "Cars")
      return (
        <MyCars
          onViewDetails={handleViewDetails}
          onEditCar={handleEditCar}
          onAddCar={handleAddCar}
        />
      );
    if (activePage === "CarDetails")
      return <ViewDetails carId={selectedCar} onBack={handleBackToCars} />;
    if (activePage === "EditCar")
      return <EditCar carId={selectedCar} onBack={handleBackToCars} />;
    if (activePage === "AddCar") return <AddCar onBack={handleBackToCars} />;
    if (activePage === "Users") return <Dealers />;
    return <DashboardHome />;
  };

  return (
    <div className="dashboard-container">
      <AdminHeader />
      <div className="dashboard-content">
        <div className="sidebar">
          <ul>
            <li
              className={activePage === "Home" ? "active" : ""}
              onClick={() => setActivePage("Home")}
            >
              Home
            </li>
            <li
              className={activePage === "Cars" ? "active" : ""}
              onClick={() => setActivePage("Cars")}
            >
              Cars
            </li>
            <li
              className={activePage === "Users" ? "active" : ""}
              onClick={() => setActivePage("Users")}
            >
              Users
            </li>
          </ul>
        </div>
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
