const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const GiftCardTransactions = require("../db/giftCardTransaction"); // Correct path

// Routes (updated below)
// CREATE
router.post("/", async (req, res) => {
  try {
    const giftCardTransactions = new GiftCardTransactions(req.body);
    await giftCardTransactions.save();
    res.status(201).json(giftCardTransactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const giftCardTransactions = await GiftCardTransactions.find();
    res.json(giftCardTransactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const giftCardTransactions = await GiftCardTransactions.findOne({
      id: req.params.id,
    });
    if (!giftCardTransactions)
      return res.status(404).json({ error: "GiftCardTransactions not found" });
    res.json(giftCardTransactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const giftCardTransactions = await GiftCardTransactions.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!giftCardTransactions)
      return res.status(404).json({ error: "GiftCardTransactions not found" });
    res.json(giftCardTransactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const giftCardTransactions = await GiftCardTransactions.findOneAndDelete({
      id: req.params.id,
    });
    if (!giftCardTransactions)
      return res.status(404).json({ error: "GiftCardTransactions not found" });
    res.json({ message: "GiftCardTransactions deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
