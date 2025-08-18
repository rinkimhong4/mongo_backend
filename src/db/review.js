const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review_text: { type: String, maxlength: 500 },
  review_date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema, "reviews");
module.exports = Review;
