const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const DiscountSchema = new mongoose.Schema({
  // id: { type: Number, unique: true }, // auto-incremented
  product_id: { type: String, required: true, maxlength: 100 },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date, default: Date.now },
});

// currencySchema.plugin(AutoIncrement, { inc_field: "id" });

const Discount = mongoose.model("discounts", DiscountSchema);
module.exports = Discount;
