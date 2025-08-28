const express = require("express");
const LoyaltyProgram = require("../db/loyaltyProgram");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const item = new LoyaltyProgram(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const items = await LoyaltyProgram.find().populate("customer_id");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const item = await LoyaltyProgram.findById(req.params.id).populate(
      "customer_id"
    );
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const item = await LoyaltyProgram.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const item = await LoyaltyProgram.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BY CUSTOMER
router.get("/customer/:customerId", async (req, res) => {
  try {
    const items = await LoyaltyProgram.find({
      customer_id: req.params.customerId,
    }).populate("customer_id");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
