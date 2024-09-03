const { successResponse } = require("../../constants/response");
const Enquiry = require("../../models/Enquiry/EnquiryModel");

module.exports = {
  sendEnquiry: async (data) => {
    try {
      let res = await Enquiry.create(data);
      res.send(successResponse);
    } catch (error) {
      return error;
    }
  },
  getEnquiries: async (query) => {
    try {
      const {
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc",
        startDate,
        endDate,
        carId,
        detailsSent,
        carPurchased,
      } = query;

      const filter = {};
      if (carId) filter.carId = carId;
      if (detailsSent) filter.detailsSent = detailsSent === "true";
      if (carPurchased) filter.carPurchased = carPurchased === "true";
      if (startDate && endDate) {
        filter.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      const totalCount = await Enquiry.countDocuments(filter);

      const enquiries = await Enquiry.find(filter)
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      let resp = {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page),
        data: enquiries,
      };
      successResponse.data = resp;
      return successResponse;
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
