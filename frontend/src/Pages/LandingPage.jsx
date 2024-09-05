import React from "react";
import Header from "../new_ui/components/Header/Header";
import ImageCarousel from "../new_ui/components/Carousel/Carousel";
import ListCars from "../new_ui/sections/ListCars";
import SubHeader from "../new_ui/components/SubHeader/SubHeader";
import HeaderWithMegaDropdown from "../new_ui/components/HeaderWithMegaDropdown/HeaderWithMegaDropdown";
import Carousel from "../new_ui/components/Carousel/Carousel";
import FilterComponent from "../Components/FilterComponent/FilterComponent";
import AllCars from "../Screens/AllCars/AllCars";
import StatsCards from "../Components/StatsCards/StatsCards";
import WhyChooseUs from "../new_ui/sections/WhyChooseUs.js/WhyChooseUs";
import Footer from "../Components/Footer/Footer";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* <Header /> */}

      <main>
        <div className="container">
          {/* <ImageCarousel /> */}
          <Carousel />
          {/* <ListCars /> */}

          <div className="row mt-0">
            <StatsCards />
            <hr />
            <AllCars />
          </div>
        </div>
        <WhyChooseUs />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;
