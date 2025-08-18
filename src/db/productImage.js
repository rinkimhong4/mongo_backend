const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  image_url: { type: String, required: true, maxlength: 200 },
  uploaded_at: { type: Date, default: Date.now },
});

const ProductImage = mongoose.model(
  "ProductImage",
  productImageSchema,
  "productImages"
);
module.exports = ProductImage;
