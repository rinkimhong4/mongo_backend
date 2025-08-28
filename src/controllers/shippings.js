const express = require("express");
const Shipping = require("../db/shipping");
const router = express.Router();

// CREATE shipping
router.post("/", async (req, res) => {
  try {
    const shipping = new Shipping(req.body);
    await shipping.save();
    res.status(201).json(shipping);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all shipping
router.get("/", async (req, res) => {
  try {
    const shippingItems = await Shipping.find().populate("order_id");
    res.json(shippingItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one shipping by ID
router.get("/:id", async (req, res) => {
  try {
    const shipping = await Shipping.findById(req.params.id).populate(
      "order_id"
    );
    if (!shipping) return res.status(404).json({ error: "Shipping not found" });
    res.json(shipping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE shipping by ID
router.put("/:id", async (req, res) => {
  try {
    const shipping = await Shipping.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!shipping) return res.status(404).json({ error: "Shipping not found" });
    res.json(shipping);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE shipping by ID
router.delete("/:id", async (req, res) => {
  try {
    const shipping = await Shipping.findByIdAndDelete(req.params.id);
    if (!shipping) return res.status(404).json({ error: "Shipping not found" });
    res.json({ message: "Shipping deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
