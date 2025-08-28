const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customers",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review_text: { type: String, maxlength: 500 },
  review_date: { type: Date, default: Date.now },
  is_approved: { type: Boolean, default: false },
  helpful_votes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const Review = mongoose.model("reviews", reviewSchema, "reviews");
module.exports = Review;
