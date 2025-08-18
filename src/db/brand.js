// const mongoose = require("mongoose");

// const brandSchema = new mongoose.Schema({
//   id: { type: Number, required: true, unique: true },
//   brand_name: { type: String, required: true, maxlength: 100 },
// });

// // brandSchema.plugin(AutoIncrement, { inc_field: "id" });
// const Brand = mongoose.model("brands", brandSchema);

// module.exports = Brand;
// brand.js
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const brandSchema = new mongoose.Schema({
  brand_name: { type: String, required: true, maxlength: 100 },
});

brandSchema.plugin(AutoIncrement, { inc_field: "brand_id" });

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
