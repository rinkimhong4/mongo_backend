const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brand_id: { type: Number, required: true, unique: true },
  brand_name: { type: String, required: true, maxlength: 100 },
});

module.exports = mongoose.model("Brand", brandSchema);
