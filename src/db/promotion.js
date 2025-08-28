const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const promotionSchema = new mongoose.Schema({
  promo_id: { type: Number, unique: true },
  promo_name: { type: String, required: true, maxlength: 100 },
  discount_percentage: { type: Number, required: true, min: 0, max: 100 },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  is_active: { type: Boolean, default: true },
  applicable_categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  ],
  created_at: { type: Date, default: Date.now },
});

promotionSchema.plugin(AutoIncrement, { inc_field: "promo_id" });

const Promotion = mongoose.model("Promotion", promotionSchema, "promotions");

module.exports = Promotion;
