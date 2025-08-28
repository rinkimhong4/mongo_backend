const express = require("express");
const router = express.Router();
const EmployeeAttendance = require("../db/employeeattendance");

// CREATE
router.post("/", async (req, res) => {
  try {
    const attendance = new EmployeeAttendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const list = await EmployeeAttendance.find().populate("employee_id");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const attendance = await EmployeeAttendance.findById(
      req.params.id
    ).populate("employee_id");
    if (!attendance)
      return res.status(404).json({ error: "EmployeeAttendance not found" });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const attendance = await EmployeeAttendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attendance)
      return res.status(404).json({ error: "EmployeeAttendance not found" });
    res.json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const attendance = await EmployeeAttendance.findByIdAndDelete(
      req.params.id
    );
    if (!attendance)
      return res.status(404).json({ error: "EmployeeAttendance not found" });
    res.json({ message: "EmployeeAttendance deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
