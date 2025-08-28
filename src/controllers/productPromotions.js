const express = require("express");
const ProductPromotion = require("../db/productPromotion");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const item = new ProductPromotion(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all with populated promo
router.get("/", async (req, res) => {
  try {
    const items = await ProductPromotion.find()
      .populate("product_id")
      .populate("promo_id");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await ProductPromotion.findById(req.params.id)
      .populate("product_id")
      .populate("promo_id");
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const item = await ProductPromotion.findByIdAndUpdate(
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
    const item = await ProductPromotion.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
