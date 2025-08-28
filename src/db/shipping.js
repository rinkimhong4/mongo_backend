const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  tracking_number: { type: String, required: true, maxlength: 50 },
  shipping_method: { type: String, required: true, maxlength: 50 },
  shipping_status: {
    type: String,
    enum: ["pending", "in_transit", "shipped", "delivered"],
    required: true,
  },
  estimated_delivery: { type: Date, required: true },
  shipping_cost: { type: Number, required: true, min: 0 },
  shipping_address: { type: String, required: true, maxlength: 255 },
  created_at: { type: Date, default: Date.now },
});

const Shipping = mongoose.model("Shipping", shippingSchema, "shipping");
module.exports = Shipping;
