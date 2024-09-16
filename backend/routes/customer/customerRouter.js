const express = require("express");
const {
  sendEnquiry,
  getEnquiries,
  sendFeedback,
  addReview,
  getReviews,
} = require("../../controller/customer/customerController");
const customerRouter = express.Router();

customerRouter.get("/", (req, res) => {
  res.send("Customer router called");
});

customerRouter.post("/enquiry", async (req, res) => {
  let result = await sendEnquiry(req.body);
  res.send(result);
});

customerRouter.get("/enquiries", async (req, res) => {
  let result = await getEnquiries(req.query);
  res.send(result);
});

customerRouter.post("/add-feedback", async (req, res) => {
  let result = await sendFeedback(req.body);
  res.send(result);
});

customerRouter.post("/add-review", async (req, res) => {
  let result = await addReview(req.body);
  res.send(result);
});

customerRouter.get("/get-reviews", async (req, res) => {
  let result = await getReviews(req.query);
  res.send(result);
});

module.exports = customerRouter;
