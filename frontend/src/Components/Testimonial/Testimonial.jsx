import React from "react";
import Slider from "react-slick";
import "./TestimonialCarousel.css";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image:
      "https://headshots-inc.com/wp-content/uploads/2022/04/website-photos-2.jpg",
    review:
      "Great service! The process was smooth, and I found the perfect car.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZkbwx2EclOGpeo3ApVEY6Gujm17rVcC8oGq0nRdVqj6QbB9iHjXNeZl4kPD7CqLpYYOo&usqp=CAU",
    review: "Very satisfied with the purchase. Highly recommend this place.",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael Johnson",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzqQ_Q2xcop9NVikeaUow-L_acyqC8klLWEUbDdMCNUHy_m7aDiQqZXAdxIZe0aNOCsxo&usqp=CAU",
    review:
      "Excellent customer support and a wide range of cars to choose from.",
    rating: 5,
  },
  // Add more testimonials here
];

const Testimonial = () => {
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
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>
                <p className="testimonial-name">- {testimonial.name}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonial;
