// final/mongo_backend/src/controllers/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../db/order");

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch orders", message: error.message });
  }
});

// GET single order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch order", message: error.message });
  }
});

// UPDATE order
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update order", message: error.message });
  }
});

// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete order", message: error.message });
  }
});

module.exports = router;
