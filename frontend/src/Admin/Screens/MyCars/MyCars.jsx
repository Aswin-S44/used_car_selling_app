import React, { useEffect, useState } from "react";
import { Table, Dropdown, DropdownButton, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyCars.css";
import axios from "axios";
import { BACKEND_URL } from "../../../config/config";

const MyCars = ({ onViewDetails, onEditCar, onAddCar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDealer, setFilterDealer] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [query, setQuery] = useState({});

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);

      let res = await axios.get(`${BACKEND_URL}/admin/get-cars`);
      setLoading(false);
      if (res && res.data) {
        setCars(res?.data?.data);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = cars
    .filter((car) =>
      car?.car_name?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    .filter((car) => filterDealer === "All" || car.dealer === filterDealer);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
    <div className="my-cars">
      <div>
        <button className="add-btn" onClick={onAddCar}>
          Add Car
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
              <td>{car.car_name}</td>
              <td>
                <DropdownButton id="dropdown-basic-button" title="Actions">
                  <Dropdown.Item onClick={() => onViewDetails(car?._id)}>
                    View
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onEditCar(car?._id)}>
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

export default MyCars;
