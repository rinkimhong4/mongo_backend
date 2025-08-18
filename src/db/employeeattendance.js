const mongoose = require("mongoose");

const employeeAttendanceSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["present", "leave", "absent"],
    required: true,
  },
});

module.exports = mongoose.model(
  "EmployeeAttendance",
  employeeAttendanceSchema,
  "employeeAttendance"
);
