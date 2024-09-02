const express = require("express");
const {
  addCar,
  getAllCars,
  getCar,
} = require("../../controller/admin/adminRouter");
const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.send("Admin router");
});

adminRouter.post("/add-car", async (req, res) => {
  let response = await addCar(req.body);
  res.send(response);
});

adminRouter.get("/get-cars", async (req, res) => {
  let response = await getAllCars(req.query);
  res.send(response);
});

adminRouter.get("/car/:id", async (req, res) => {
  let response = await getCar(req.params.id);
  res.send(response);
});

module.exports = adminRouter;
