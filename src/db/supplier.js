const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const supplierSchema = new mongoose.Schema({
  supplier_id: { type: Number, unique: true },
  supplier_name: { type: String, required: true, maxlength: 100 },
  contact_person: { type: String, maxlength: 100 },
  phone: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 100 },
  address: { type: String, maxlength: 200 },
});

supplierSchema.plugin(AutoIncrement, { inc_field: "supplier_id" });

const Supplier = mongoose.model("Supplier", supplierSchema, "suppliers");
module.exports = Supplier;
