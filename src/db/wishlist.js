const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
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
  added_date: { type: Date, default: Date.now },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema, "wishlist");
module.exports = Wishlist;
