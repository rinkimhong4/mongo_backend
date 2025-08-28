const mongoose = require("mongoose");

// Import the models you reference
require("./customer"); // ensures Customer schema is registered
require("./order"); // ensures Order schema is registered
require("./product"); // ensures Product schema is registered

const returnSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customers", // match the model name exactly
  },
  reason: { type: String, required: true, maxlength: 200 },
  return_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["requested", "approved", "completed"],
    required: true,
  },
  refund_amount: { type: Number, required: true, min: 0 },
  created_at: { type: Date, default: Date.now },
});

const Return = mongoose.model("Return", returnSchema, "returns");
module.exports = Return;
