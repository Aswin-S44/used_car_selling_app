const { successResponse } = require("../../constants/response");
const Cars = require("../../models/cars/carSchema");

module.exports = {
  addCar: async (data) => {
    try {
      let res = await Cars.create(data);
      successResponse.data = res;
      return successResponse;
    } catch (error) {
      return error;
    }
  },
  // getAllCars: async (query) => {
  //   try {
  //     let filter = {};
  //     if (query.car_name) filter.car_name = query.car_name;
  //     if (query.brand) filter.brand = query.brand;
  //     if (query.model) filter.model = query.model;
  //     if (query.year) filter.year = query.year;
  //     if (query.kilometer) filter.kilometer = { $lte: query.kilometer };
  //     if (query.owner) filter.owner = query.owner;
  //     if (query.shop_name) filter.shop_name = query.shop_name;
  //     if (query.dealer) filter.dealer = query.dealer;
  //     if (query.loan_available !== undefined)
  //       filter.loan_available = query.loan_available === "true";
  //     if (query.varient) filter.varient = query.varient;
  //     if (query.claim !== undefined) filter.claim = query.claim === "true";
  //     if (query.sold !== undefined) filter.sold = query.sold === "true";

  //     const page = parseInt(query.page) || 1;
  //     const limit = parseInt(query.limit) || 10;
  //     const skip = (page - 1) * limit;

  //     if (query.priceRange) {
  //       const [minPrice, maxPrice] = query.priceRange;
  //       filter.price = { $gte: minPrice, $lte: maxPrice };
  //     }

  //     let cars = await Cars.find(filter).skip(skip).limit(limit);

  //     return { success: true, data: cars, page, limit };
  //   } catch (error) {}
  // },

  // getAllCars: async (query) => {
  //   try {
  //     let filter = {};
  //     if (query.car_name) filter.car_name = query.car_name;
  //     if (query.brand) filter.brand = query.brand;
  //     if (query.model) filter.model = query.model;
  //     if (query.year) filter.year = query.year;
  //     if (query.kilometer) filter.kilometer = { $lte: query.kilometer };
  //     if (query.owner) filter.owner = query.owner;
  //     if (query.shop_name) filter.shop_name = query.shop_name;
  //     if (query.dealer) filter.dealer = query.dealer;
  //     if (query.loan_available !== undefined)
  //       filter.loan_available = query.loan_available === "true";
  //     if (query.varient) filter.varient = query.varient;
  //     if (query.claim !== undefined) filter.claim = query.claim === "true";
  //     if (query.sold !== undefined) filter.sold = query.sold === "true";

  //     const page = parseInt(query.page) || 1;
  //     const limit = parseInt(query.limit) || 10;
  //     const skip = (page - 1) * limit;

  //     if (query.priceRange) {
  //       const [minPrice, maxPrice] = query.priceRange;
  //       filter.price = { $gte: minPrice, $lte: maxPrice };
  //     }

  //     const cars = await Cars.find(filter).skip(skip).limit(limit);
  //     const totalCars = await Cars.countDocuments(filter); // Total count of cars matching the filter

  //     return { success: true, data: cars, totalCars, page, limit };
  //   } catch (error) {
  //     console.error(error);
  //     return { success: false, error: error.message };
  //   }
  // },

  // getAllCars: async (query) => {
  //   try {
  //     let filter = {};

  //     // Apply various filters
  //     if (query.car_name) filter.car_name = query.car_name;
  //     if (query.brand) filter.brand = query.brand;
  //     if (query.model) filter.model = query.model;
  //     if (query.year) filter.year = query.year;
  //     if (query.kilometer) filter.kilometer = { $lte: query.kilometer };
  //     if (query.owner) filter.owner = query.owner;
  //     if (query.shop_name) filter.shop_name = query.shop_name;
  //     if (query.dealer) filter.dealer = query.dealer;
  //     if (query.loan_available !== undefined)
  //       filter.loan_available = query.loan_available === "true";
  //     if (query.varient) filter.varient = query.varient;
  //     if (query.claim !== undefined) filter.claim = query.claim === "true";
  //     if (query.sold !== undefined) filter.sold = query.sold === "true";

  //     const page = parseInt(query.page) || 1;
  //     const limit = parseInt(query.limit) || 10;
  //     const skip = (page - 1) * limit;

  //     // Handling price range safely
  //     if (query.priceRange) {
  //       const [minPrice, maxPrice] = query.priceRange;

  //       // Convert to numbers and ensure they are valid numbers
  //       const parsedMinPrice = parseFloat(minPrice);
  //       const parsedMaxPrice = parseFloat(maxPrice);

  //       if (!isNaN(parsedMinPrice) && !isNaN(parsedMaxPrice)) {
  //         filter.price = { $gte: parsedMinPrice, $lte: parsedMaxPrice };
  //       }
  //     }

  //     // Fetch cars and total count
  //     const cars = await Cars.find(filter).skip(skip).limit(limit);
  //     const totalCars = await Cars.countDocuments(filter);

  //     return { success: true, data: cars, totalCars, page, limit };
  //   } catch (error) {
  //     console.error(error);
  //     return { success: false, error: error.message };
  //   }
  // },

  getAllCars: async (query) => {
    try {
      let filter = {};

      // Search functionality (partial match for car name, brand, and model)
      if (query.search) {
        filter.$or = [
          { car_name: { $regex: query.search, $options: "i" } }, // Case-insensitive search
          { brand: { $regex: query.search, $options: "i" } },
          { model: { $regex: query.search, $options: "i" } },
        ];
      }

      // Apply various filters
      if (query.car_name) filter.car_name = query.car_name;
      if (query.brand) filter.brand = query.brand;
      if (query.model) filter.model = query.model;
      if (query.year) filter.year = query.year;
      if (query.kilometer) filter.kilometer = { $lte: query.kilometer };
      if (query.owner) filter.owner = query.owner;
      if (query.shop_name) filter.shop_name = query.shop_name;
      if (query.dealer) filter.dealer = query.dealer;
      if (query.loan_available !== undefined)
        filter.loan_available = query.loan_available === "true";
      if (query.varient) filter.varient = query.varient;
      if (query.claim !== undefined) filter.claim = query.claim === "true";
      if (query.sold !== undefined) filter.sold = query.sold === "true";

      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      // Handling price range safely
      if (query.priceRange) {
        const [minPrice, maxPrice] = query.priceRange;

        // Convert to numbers and ensure they are valid numbers
        const parsedMinPrice = parseFloat(minPrice);
        const parsedMaxPrice = parseFloat(maxPrice);

        if (!isNaN(parsedMinPrice) && !isNaN(parsedMaxPrice)) {
          filter.price = { $gte: parsedMinPrice, $lte: parsedMaxPrice };
        }
      }

      // Fetch cars and total count
      const cars = await Cars.find(filter).skip(skip).limit(limit);
      const totalCars = await Cars.countDocuments(filter);

      return { success: true, data: cars, totalCars, page, limit };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  },

  getCar: async (carId) => {
    try {
      let car = await Cars.findOne({ _id: carId });
      successResponse.data = car;
      return successResponse;
    } catch (error) {
      return error;
    }
  },
};
