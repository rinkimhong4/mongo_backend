const mongoose = require("mongoose");

// Ensure Order and Product models are registered
require("./order");
require("./product");

const orderItemSchema = new mongoose.Schema({
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
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  subtotal: { type: Number, required: true, min: 0 },
  tax_amount: { type: Number, default: 0, min: 0 },
  created_at: { type: Date, default: Date.now },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema, "orderItems");
module.exports = OrderItem;
