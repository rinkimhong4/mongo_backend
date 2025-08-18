const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const customerSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 100, unique: true },
  phone: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: true, maxlength: 100 },
  city: { type: String, required: true, maxlength: 100 },
  country: { type: String, required: true, maxlength: 100 },
  created_at: { type: Date, default: Date.now },
});

customerSchema.plugin(AutoIncrement, { inc_field: "customerId" });

const Customer = mongoose.model("customers", customerSchema, "customers");

module.exports = Customer;
