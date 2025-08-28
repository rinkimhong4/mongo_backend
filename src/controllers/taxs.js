const express = require("express");
const Tax = require("../db/tax");
const router = express.Router();

// CREATE a tax item
router.post("/", async (req, res) => {
  try {
    const taxItem = new Tax(req.body);
    await taxItem.save();
    res.status(201).json(taxItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all tax items
router.get("/", async (req, res) => {
  try {
    const taxItems = await Tax.find();
    res.json(taxItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one tax item by ID
router.get("/:id", async (req, res) => {
  try {
    const taxItem = await Tax.findById(req.params.id);
    if (!taxItem) return res.status(404).json({ error: "Tax item not found" });
    res.json(taxItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a tax item by ID
router.put("/:id", async (req, res) => {
  try {
    const taxItem = await Tax.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!taxItem) return res.status(404).json({ error: "Tax item not found" });
    res.json(taxItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a tax item by ID
router.delete("/:id", async (req, res) => {
  try {
    const taxItem = await Tax.findByIdAndDelete(req.params.id);
    if (!taxItem) return res.status(404).json({ error: "Tax item not found" });
    res.json({ message: "Tax item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
