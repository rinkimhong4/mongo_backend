const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Category = require("./category");
const Brand = require("./brand");

const productSchema = new mongoose.Schema({
  product_id: { type: Number, unique: true },
  product_name: { type: String, required: true, maxlength: 100 },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  brand_id: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  description: { type: String, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  stock_quantity: { type: Number, default: 0 },
  size: { type: String, maxlength: 50 },
  color: { type: String, maxlength: 50 },
  material: { type: String, maxlength: 100 },
  sku: { type: String, unique: true },
  created_at: { type: Date, default: Date.now },
});

productSchema.plugin(AutoIncrement, { inc_field: "product_id" });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
