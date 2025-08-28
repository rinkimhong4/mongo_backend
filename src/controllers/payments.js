const express = require("express");
const Payment = require("../db/payment"); // use correct variable name
const router = express.Router();

// CREATE a payment
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().populate("order_id");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("order_id");
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE payment by ID
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE payment by ID
router.delete("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET payments by order
router.get("/order/:orderId", async (req, res) => {
  try {
    const payments = await Payment.find({ order_id: req.params.orderId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
