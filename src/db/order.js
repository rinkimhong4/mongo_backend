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
});

orderSchema.plugin(AutoIncrement, { inc_field: "order_id" });

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
