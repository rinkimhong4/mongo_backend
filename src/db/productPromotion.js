const mongoose = require("mongoose");

const productPromotionSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  promo_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Promotion", // now properly linked
  },
  effective_discount: { type: Number, required: true, min: 0, max: 100 },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

const ProductPromotion = mongoose.model(
  "ProductPromotion",
  productPromotionSchema,
  "productPromotions"
);

module.exports = ProductPromotion;
