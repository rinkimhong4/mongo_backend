const mongoose = require("mongoose");

const customerSupportSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customers",
  },
  issue_type: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  status: {
    type: String,
    required: true,
    maxlength: 100,
    enum: ["open", "in_progress", "closed"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const CustomerSupport = mongoose.model(
  "CustomerSupport",
  customerSupportSchema,
  "customerSupport"
);

module.exports = CustomerSupport;
