const mongoose = require("mongoose");

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
  reason: { type: String, required: true, maxlength: 200 },
  return_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["requested", "approved", "completed"],
    required: true,
  },
});

const Return = mongoose.model("Return", returnSchema, "returns");
module.exports = Return;
