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
    ref: "Promotion",
  },
});

const ProductPromotion = mongoose.model(
  "ProductPromotion",
  productPromotionSchema,
  "productPromotions"
);
module.exports = ProductPromotion;
