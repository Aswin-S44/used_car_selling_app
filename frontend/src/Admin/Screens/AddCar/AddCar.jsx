import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddCar.css";

function AddCar({ onBack }) {
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const handleMainImageChange = (e) => {
    setMainImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="add-car">
      <Button onClick={onBack} className="btn btn-secondary mb-3">
        Back
      </Button>
      <h2>Add New Car</h2>
      <Form>
        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="carName">
              <Form.Label>Car Name</Form.Label>
              <Form.Control type="text" placeholder="Enter car name" />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="carBrand">
              <Form.Label>Car Brand</Form.Label>
              <Form.Control type="text" placeholder="Enter car brand" />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="carModel">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" placeholder="Enter car model" />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="modelYear">
              <Form.Label>Model Year</Form.Label>
              <Form.Control type="number" placeholder="Enter model year" />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="totalKilometers">
              <Form.Label>Total Kilometers Run</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total kilometers run"
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="fullOption">
              <Form.Label>Full Option</Form.Label>
              <Form.Control as="select">
                <option>Select an option</option>
                <option>Yes</option>
                <option>No</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="owner">
              <Form.Label>Owner</Form.Label>
              <Form.Control type="text" placeholder="Enter owner's name" />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="claims">
              <Form.Label>Claims</Form.Label>
              <Form.Control type="text" placeholder="Enter any claims" />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="brandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control type="text" placeholder="Enter brand name" />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="loadAvailable">
              <Form.Label>Load Available</Form.Label>
              <Form.Control as="select">
                <option>Select an option</option>
                <option>Yes</option>
                <option>No</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <Form.Group controlId="dealerName">
          <Form.Label>Dealer</Form.Label>
          <Form.Control as="select">
            <option>Select a dealer</option>
            <option>Dealer A</option>
            <option>Dealer B</option>
            <option>Dealer C</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="carDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter car description"
          />
        </Form.Group>

        <Form.Group controlId="mainImage">
          <Form.Label>Main Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
          />
          {mainImage && (
            <img src={mainImage} alt="Main" className="img-thumbnail mt-2" />
          )}
        </Form.Group>

        <Form.Group controlId="additionalImages">
          <Form.Label>Additional Images (up to 5)</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
          />
          <div className="additional-images mt-2">
            {additionalImages.map((image, index) => (
              <div key={index} className="image-preview">
                <img
                  src={image}
                  alt={`Additional ${index}`}
                  className="img-thumbnail"
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="remove-btn"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Form.Group>

        <Button type="submit" className="btn btn-primary">
          Add Car
        </Button>
      </Form>
    </div>
  );
}

export default AddCar;
