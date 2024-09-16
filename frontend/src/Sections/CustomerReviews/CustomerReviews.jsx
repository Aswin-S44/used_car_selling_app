import React, { useState } from "react";
import "./CustomerReviews.css";
import Rating from "../../Components/Rating/Rating";

const CustomerReviews = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

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
              <div className="review-rating">
                <Rating rating={review?.rating} />
              </div>
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
