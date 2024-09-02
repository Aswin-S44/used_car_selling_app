const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
  {
    car_name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    kilometer: { type: Number, required: true },
    varient: { type: String, required: true },
    owner: { type: String, required: true },
    claim: { type: Boolean, required: true },
    major_accident: { type: Boolean, required: true },
    shop_name: { type: String, required: true },
    loan_available: { type: Boolean, required: true },
    dealer: { type: String, required: true },
    about: { type: String, required: false },
    image: { type: String, required: true },
    additional_images: [],
    sold: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const Cars = mongoose.model("Cars", carSchema);
module.exports = Cars;
