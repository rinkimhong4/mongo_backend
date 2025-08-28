const express = require("express");
const router = express.Router();
const Discount = require("../db/discount");

// CREATE
router.post("/", async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const discount = await Discount.find();
    res.json(discount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const discount = await Discount.findOne({ id: req.params.id });
    if (!discount) return res.status(404).json({ error: "Discount not found" });
    res.json(discount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const discount = await Discount.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!discount) return res.status(404).json({ error: "Discount not found" });
    res.json(discount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const discount = await Discount.findOneAndDelete({ id: req.params.id });
    if (!discount) return res.status(404).json({ error: "discount not found" });
    res.json({ message: "discount deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
