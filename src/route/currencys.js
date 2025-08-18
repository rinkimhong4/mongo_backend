const express = require("express");
const router = express.Router();
const Currency = require("../db/currency");

// CREATE
router.post("/", async (req, res) => {
  try {
    const currency = new Currency(req.body);
    await currency.save();
    res.status(201).json(currency);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const currency = await Currency.findOne({ id: req.params.id });
    if (!currency) return res.status(404).json({ error: "Currency not found" });
    res.json(currency);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const currency = await Currency.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!currency) return res.status(404).json({ error: "Currency not found" });
    res.json(currency);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const currency = await Currency.findOneAndDelete({ id: req.params.id });
    if (!currency) return res.status(404).json({ error: "currency not found" });
    res.json({ message: "currency deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
