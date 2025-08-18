const mongoose = require("mongoose");

const loyaltyProgramSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  points: { type: Number, required: true, min: 0 },
  last_updated: { type: Date, default: Date.now },
});

const LoyaltyProgram = mongoose.model(
  "LoyaltyProgram",
  loyaltyProgramSchema,
  "loyaltyProgram"
);
module.exports = LoyaltyProgram;
