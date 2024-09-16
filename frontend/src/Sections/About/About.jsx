import React, { useEffect, useState } from "react";
import "./About.css";

function About() {
  const [isVisible, setIsVisible] = useState({
    image: false,
    content: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const imageElement = document.querySelector(".image-container");
      const contentElement = document.querySelector(".content-container");

      if (imageElement && contentElement) {
        const imagePosition = imageElement.getBoundingClientRect().top;
        const contentPosition = contentElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (imagePosition < windowHeight * 0.75) {
          setIsVisible((prevState) => ({ ...prevState, image: true }));
        }

        if (contentPosition < windowHeight * 0.75) {
          setIsVisible((prevState) => ({ ...prevState, content: true }));
        }
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, []);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  return (
    <div className="about-page">
      <div className="container mt-5">
        <div className="row">
          <div
            className={`col-md-6 image-container ${
              isVisible.image ? "animate-image" : ""
            }`}
          >
            <img src="/about.jpeg" alt="About Us" className="w-100" />
          </div>
          <div
            className={`col-md-6 content-container ${
              isVisible.content ? "animate-content" : ""
            }`}
          >
            <h2>About Us</h2>
            <p className="about-paragraph mt-4">
              WheelzLoop is your ultimate destination for finding high-quality,
              pre-owned vehicles with ease. We offer a diverse selection of used
              cars, each meticulously inspected to ensure reliability and
              transparency. Our user-friendly platform allows you to explore,
              compare, and connect with trusted sellers, making your car-buying
              journey smooth and enjoyable. Discover your next vehicle with
              confidence at WheelzLoop, where quality and affordability meet.
            </p>

            <div className="contact-info mt-4">
              <p>
                Contact us:{" "}
                <a href="mailto:info@yourapp.com">info@yourapp.com</a>
              </p>
              <p>
                Follow us on social media: <a href="#">Facebook</a> |{" "}
                <a href="#">Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
