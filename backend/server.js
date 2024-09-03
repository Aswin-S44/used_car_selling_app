const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const dealerRouter = require("./routes/dealer/dealerRouter");
const adminRouter = require("./routes/admin/adminRouter");
const customerRouter = require("./routes/customer/customerRouter");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;
db.connect();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes configurations
app.use("/api/v1/dealer", dealerRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/customer", customerRouter);

app.get("/", (req, res) => {
  res.send("Nodejs server is running....");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
