import React, { useState, useEffect } from "react";
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
import Testimonial from "../Components/Testimonial/Testimonial";
import AboutUs from "../new_ui/sections/AboutUs/AboutUs";
import Banner from "../Components/Banner/Banner";

function LandingPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="landing-page">
      {/* <Header /> */}
      <main>
        <div className="container-fluid">
          {isMobile ? <Banner /> : <Carousel />}

          <div className="row mt-0">
            <StatsCards />
            <AboutUs />
            <hr />
            <AllCars />
          </div>
        </div>
        <WhyChooseUs />
        <Testimonial />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;
