import React, { useState } from "react";
import "./CustomerReviews.css";

const CustomerReviews = () => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "Amazing car! The driving experience is top-notch, and the interiors are super luxurious. Highly recommend!",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      review:
        "Good car but had a few minor issues with the infotainment system. Overall, a good purchase.",
      rating: 4,
    },
    {
      id: 3,
      name: "Alex Johnson",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      review:
        "Smooth ride and great customer service. I love how the car handles on long trips.",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Davis",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      review:
        "Great fuel economy and very comfortable for family trips. Highly satisfied with the purchase.",
      rating: 4,
    },
    {
      id: 5,
      name: "Chris Lee",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      review:
        "The car is good overall, but I experienced some delays in delivery. However, the performance is fantastic.",
      rating: 3,
    },
  ];

  const handleLoadMore = () => {
    setVisibleReviews(reviews.length);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="reviews-section w-100">
      <h2 className="reviews-title">Customer Reviews</h2>
      <ul className="reviews-list">
        {reviews.slice(0, visibleReviews).map((review) => (
          <li key={review.id} className="review-item">
            <img
              src={review.image}
              alt={review.name}
              className="review-avatar"
            />
            <div className="review-content">
              <h3 className="review-author">{review.name}</h3>
              <p className="review-text">{review.review}</p>
              <div className="review-rating">{renderStars(review.rating)}</div>
            </div>
          </li>
        ))}
      </ul>
      {visibleReviews < reviews.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default CustomerReviews;
