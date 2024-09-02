import React, { useState } from "react";
import { Table, Dropdown, DropdownButton, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dealers.css";

const Dealers = ({ onViewDetails, onEditCar, onAddCar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDealer, setFilterDealer] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Example car data; replace with actual data
  const cars = [
    { id: 1, image: "car1.jpg", dealer: "Dealer A", name: "Car Model X" },
    { id: 2, image: "car2.jpg", dealer: "Dealer B", name: "Car Model Y" },
    { id: 3, image: "car3.jpg", dealer: "Dealer A", name: "Car Model Z" },
    { id: 4, image: "car4.jpg", dealer: "Dealer C", name: "Car Model A" },
    { id: 5, image: "car5.jpg", dealer: "Dealer B", name: "Car Model B" },
    { id: 6, image: "car6.jpg", dealer: "Dealer A", name: "Car Model C" },
    // Add more cars as needed
  ];

  const filteredCars = cars
    .filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((car) => filterDealer === "All" || car.dealer === filterDealer);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
    <div className="my-cars">
      <div>
        <button className="add-btn" onClick={onAddCar}>
          Add Dealer
        </button>
      </div>
      <div className="controls">
        <Form.Control
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Control
          as="select"
          value={filterDealer}
          onChange={(e) => setFilterDealer(e.target.value)}
        >
          <option>All</option>
          <option>Dealer A</option>
          <option>Dealer B</option>
          <option>Dealer C</option>
          {/* Add more options as needed */}
        </Form.Control>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Dealer</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCars.map((car) => (
            <tr key={car.id}>
              <td>
                <img src={car.image} alt={car.name} width="100" />
              </td>
              <td>{car.dealer}</td>
              <td>{car.name}</td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="Actions">
                  <Dropdown.Item onClick={() => onViewDetails(car.id)}>
                    View
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onEditCar(car.id)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Dealers;
