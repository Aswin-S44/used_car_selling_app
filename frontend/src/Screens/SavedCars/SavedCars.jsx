import React from "react";
import "./SavedCars.css"; // Ensure to include this CSS file

const SavedCars = () => {
  const savedCars = [
    {
      _id: "66db193d9cb3f20797429868",
      car_name: "BMW M4",
      brand: "BMW",
      model: "330i M Sport",
      year: "2020",
      kilometer: 1000,
      price: 4500000,
      image:
        "https://images.clickdealer.co.uk/vehicles/5356/5356433/large1/124206382.jpg",
    },
    {
      _id: "66db1a47ed394c057ec36c83",
      car_name: "Lexus LS",
      brand: "Lexus",
      model: "New Edition",
      year: "2018",
      kilometer: 2301,
      price: 89127121,
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/28191/ls-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
    },
  ];

  const handleRemoveFromFavorites = (id) => {
    console.log(`Removing car with id: ${id}`);
    // Add your logic to remove the car from favorites here
  };

  return (
    <div className="container mt-4">
      <div className="saved-cars-list-page">
        <h2 className="saved-cars-list-title">Saved Cars</h2>
        <ul className="saved-cars-list">
          {savedCars.map((car) => (
            <li key={car._id} className="saved-car-item">
              <img
                src={car.image}
                alt={car.car_name}
                className="saved-car-image"
              />
              <div className="saved-car-details">
                <h3 className="saved-car-name">{car.car_name}</h3>
                <p className="saved-car-info">
                  {car.year} | {car.kilometer} km
                </p>
                <p className="saved-car-price">₹{car.price.toLocaleString()}</p>
                <button
                  className="saved-car-remove-btn"
                  onClick={() => handleRemoveFromFavorites(car._id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavedCars;
