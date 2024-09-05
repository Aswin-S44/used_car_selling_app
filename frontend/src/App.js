import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import DetailsScreen from "./Screens/DetailsScreen/DetailsScreen";
import AllCars from "./Screens/AllCars/AllCars";
import Login from "./Admin/Auth/Login";
import Dashboard from "./Admin/Dashboard/Dashboard";
import LandingPage from "./Pages/LandingPage";
import Header from "./new_ui/components/Header/Header";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import SavedCars from "./Screens/SavedCars/SavedCars";

function App() {
  // Use the useLocation hook to get the current location
  const location = useLocation();

  // Define an array of paths where the Header should not be shown
  const noHeaderRoutes = ["/admin", "/dash"];

  return (
    <div>
      {/* Conditionally render Header only if the current route is not in the noHeaderRoutes array */}
      {/* {!noHeaderRoutes.includes(location.pathname) && <Header />} */}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/details/:id" element={<DetailsScreen />} />
          <Route path="/cars" element={<AllCars />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/my-favourites" element={<SavedCars />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;
