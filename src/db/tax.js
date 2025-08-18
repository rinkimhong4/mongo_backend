const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const taxSchema = new mongoose.Schema({
  tax_id: { type: Number, unique: true },
  tax_name: { type: String, required: true, maxlength: 100 },
  percentage: { type: Number, required: true, min: 0 },
});

taxSchema.plugin(AutoIncrement, { inc_field: "tax_id" });

const Tax = mongoose.model("Tax", taxSchema, "taxes");
module.exports = Tax;
