const express = require("express");
const OrderTax = require("../db/orderTax");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const item = new OrderTax(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const items = await OrderTax.find()
      .populate("order_id")
      .populate("product_id");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const item = await OrderTax.findById(req.params.id)
      .populate("order_id")
      .populate("product_id");
    if (!item) return res.status(404).json({ error: "OrderTax not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const item = await OrderTax.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ error: "OrderTax not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const item = await OrderTax.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "OrderTax not found" });
    res.json({ message: "OrderTax deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
