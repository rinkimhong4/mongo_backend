const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  image_url: { type: String, required: true, maxlength: 200 },
  image_type: { type: String, enum: ["main", "gallery"], default: "gallery" },
  alt_text: { type: String, maxlength: 200 },
  is_primary: { type: Boolean, default: false },
  uploaded_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

const ProductImage = mongoose.model(
  "ProductImage",
  productImageSchema,
  "productImages"
);

module.exports = ProductImage;
