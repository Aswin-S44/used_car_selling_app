import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./TestimonialCarousel.css";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";
import Spinner from "../Spinner/Spinner";
import Rating from "../Rating/Rating";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let res = await axios.get(
        `${BACKEND_URL}/customer/get-reviews?dealerId=all`
      );
      if (res && res.status == 200) {
        setLoading(false);
        setTestimonials(res.data);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <section className="testimonial-carousel mt-5">
      <h2 className="section-title">What Our Customers Say</h2>
      {loading ? (
        <Spinner />
      ) : (
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div className="container">
              <div className="testimonial-card p-5" key={testimonial.id}>
                <div className="testimonial-image text-center">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-review">"{testimonial.review}"</p>
                  <div className="testimonial-rating">
                    <Rating rating={testimonial?.rating} />
                  </div>
                  <p className="testimonial-name">- {testimonial.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default Testimonial;
