const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
  order_id: { type: Number, unique: true },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  order_date: { type: Date, required: true },
  total_amount: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    required: true,
  },
  shipping_address: { type: String, required: true, maxlength: 255 },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Store",
  },
  currency: { type: String, required: true, maxlength: 10 },
  created_at: { type: Date, default: Date.now },
});

orderSchema.plugin(AutoIncrement, { inc_field: "order_id" });

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
