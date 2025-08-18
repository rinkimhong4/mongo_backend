const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 100 },
  phone: { type: String, required: true, maxlength: 100 },
  position: { type: String, required: true, maxlength: 100 },
  salary: { type: Number, required: true },
  hire_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema, "employees");
