const mongoose = require("mongoose");

// Ensure Customer model is registered
require("./customer");

const loyaltyProgramSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customers", // match the Customer model name
  },
  points: { type: Number, required: true, min: 0 },
  tier: {
    type: String,
    enum: ["bronze", "silver", "gold", "platinum"],
    default: "bronze",
  },
  points_earned: { type: Number, default: 0 },
  points_redeemed: { type: Number, default: 0 },
  last_updated: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

const LoyaltyProgram = mongoose.model(
  "LoyaltyProgram",
  loyaltyProgramSchema,
  "loyaltyProgram"
);

module.exports = LoyaltyProgram;
