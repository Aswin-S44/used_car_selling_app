import React from "react";
import CarsList from "../../Sections/CarsList/CarsList";
import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import About from "../../Sections/About/About";
import HowItWorks from "../../Sections/HowItWorks/HowItWorks";
import StatsSection from "../../Sections/StatsSection/StatsSection";
import Testimonial from "../../Components/Testimonial/Testimonial";
import Contact from "../../Sections/Contact/Contact";

function HomeScreen() {
  return (
    <div>
      <Banner />
      <div className="container mt-4">
        {/* <About /> */}
        <section className="container mt-5">
          <div id="about">
            <About />
          </div>
          <div>
            <HowItWorks />
          </div>
          <div>
            <StatsSection />
          </div>
          <div className="mt-3">
            <CarsList />
          </div>
          <div className="mt-5">
            <Testimonial />
          </div>
        </section>
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default HomeScreen;
