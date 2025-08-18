const express = require("express");
const router = express.Router();
const Employee = require("../db/employee");

// CREATE
router.post("/", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const employee = await Employee.findOne({ employee_id: req.params.id });
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  res.json(employee);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const employee = await Employee.findOneAndUpdate(
    { employee_id: req.params.id },
    req.body,
    { new: true }
  );
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  res.json(employee);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const employee = await Employee.findOneAndDelete({
    employee_id: req.params.id,
  });
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  res.json({ message: "Employee deleted" });
});

module.exports = router;
