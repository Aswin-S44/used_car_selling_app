import React from "react";

function EditCar({ carId, onBack }) {
  // Example car data; replace with actual data fetching logic
  const carDetails = {
    1: {
      name: "Car Model X",
      dealer: "Dealer A",
      description: "Details about Car Model X",
    },
    2: {
      name: "Car Model Y",
      dealer: "Dealer B",
      description: "Details about Car Model Y",
    },
    // Add more car details as needed
  };

  const car = carDetails[carId];

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="edit-car">
      <button onClick={onBack} className="btn btn-secondary">
        Back
      </button>
      <h2>Edit {car.name}</h2>
      <form>
        <div className="form-group">
          <label>Car Name</label>
          <input type="text" defaultValue={car.name} />
        </div>
        <div className="form-group">
          <label>Dealer</label>
          <input type="text" defaultValue={car.dealer} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea defaultValue={car.description} />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCar;
