const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const GiftCards = require("../db/giftCard");

router.post("/", async (req, res) => {
  try {
    const giftCards = new GiftCards(req.body);
    await giftCards.save();
    res.status(201).json(giftCards);
  } catch (err) {
    console.error("Create error:", err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const giftCards = await GiftCards.find();
    res.json(giftCards);
  } catch (err) {
    console.error("Read all error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const giftCards = await GiftCards.findById(req.params.id);
    if (!giftCards) {
      return res.status(404).json({ error: "GiftCard not found" });
    }
    res.json(giftCards);
  } catch (err) {
    console.error("Read one error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const giftCards = await GiftCards.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!giftCards) {
      return res.status(404).json({ error: "GiftCard not found" });
    }
    res.json(giftCards);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const giftCards = await GiftCards.findByIdAndDelete(req.params.id);
    if (!giftCards) {
      return res.status(404).json({ error: "GiftCard not found" });
    }
    res.json({ message: "GiftCard deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
