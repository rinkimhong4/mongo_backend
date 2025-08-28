const express = require("express");
const Promotion = require("../db/promotion");
const router = express.Router();

// CREATE a promotion
router.post("/", async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all promotions
router.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.find().populate("applicable_categories");
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one promotion by ID
router.get("/:id", async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate(
      "applicable_categories"
    );
    if (!promotion)
      return res.status(404).json({ error: "Promotion not found" });
    res.json(promotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE promotion by ID
router.put("/:id", async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!promotion)
      return res.status(404).json({ error: "Promotion not found" });
    res.json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE promotion by ID
router.delete("/:id", async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion)
      return res.status(404).json({ error: "Promotion not found" });
    res.json({ message: "Promotion deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
