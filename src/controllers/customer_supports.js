const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CustomerSupport = require("../db/customer_support");

// CREATE
router.post("/", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.customer_id)) {
      return res.status(400).json({ error: "Invalid customer_id format" });
    }
    const customerSupport = new CustomerSupport(req.body);
    await customerSupport.save();
    res.status(201).json(customerSupport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const customerSupport = await CustomerSupport.find().populate(
      "customer_id",
      "first_name last_name email -_id"
    );
    res.json(customerSupport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const customerSupport = await CustomerSupport.findById(
      req.params.id
    ).populate("customer_id", "first_name last_name email -_id");
    if (!customerSupport) {
      return res.status(404).json({ error: "CustomerSupport not found" });
    }
    res.json(customerSupport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    if (
      req.body.customer_id &&
      !mongoose.Types.ObjectId.isValid(req.body.customer_id)
    ) {
      return res.status(400).json({ error: "Invalid customer_id format" });
    }
    const customerSupport = await CustomerSupport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!customerSupport) {
      return res.status(404).json({ error: "CustomerSupport not found" });
    }
    res.json(customerSupport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const customerSupport = await CustomerSupport.findByIdAndDelete(
      req.params.id
    );
    if (!customerSupport) {
      return res.status(404).json({ error: "CustomerSupport not found" });
    }
    res.json({ message: "CustomerSupport deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
