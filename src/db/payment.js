const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  payment_method: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer"],
    required: true,
  },
  payment_status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    required: true,
  },
  amount: { type: Number, required: true, min: 0 },
  payment_date: { type: Date, required: true },
  transaction_id: { type: String, required: true, unique: true },
  currency: { type: String, required: true, default: "USD" },
  created_at: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema, "payments");
module.exports = Payment;
