const mongoose = require("mongoose");

const orderTaxSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  tax_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tax",
  },
  amount: { type: Number, required: true, min: 0 },
});

const OrderTax = mongoose.model("OrderTax", orderTaxSchema, "orderTaxes");
module.exports = OrderTax;
