const express = require("express");
const Return = require("../db/return"); // fixed name
const router = express.Router();

// CREATE a return request
router.post("/", async (req, res) => {
  try {
    const returnItem = new Return(req.body);
    await returnItem.save();
    res.status(201).json(returnItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all returns
router.get("/", async (req, res) => {
  try {
    const returnItems = await Return.find()
      .populate("order_id")
      .populate("product_id")
      .populate("customer_id");
    res.json(returnItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one return by ID
router.get("/:id", async (req, res) => {
  try {
    const returnItem = await Return.findById(req.params.id)
      .populate("order_id")
      .populate("product_id")
      .populate("customer_id");
    if (!returnItem)
      return res.status(404).json({ error: "Return request not found" });
    res.json(returnItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE return request by ID
router.put("/:id", async (req, res) => {
  try {
    const returnItem = await Return.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!returnItem)
      return res.status(404).json({ error: "Return request not found" });
    res.json(returnItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE return request by ID
router.delete("/:id", async (req, res) => {
  try {
    const returnItem = await Return.findByIdAndDelete(req.params.id);
    if (!returnItem)
      return res.status(404).json({ error: "Return request not found" });
    res.json({ message: "Return request deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all returns by customer
router.get("/customer/:customerId", async (req, res) => {
  try {
    const items = await Return.find({ customer_id: req.params.customerId })
      .populate("order_id")
      .populate("product_id");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
