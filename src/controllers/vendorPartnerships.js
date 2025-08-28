const express = require("express");
const VendorPartnership = require("../db/vendorPartnership");
const router = express.Router();

// CREATE a vendor partnership
router.post("/", async (req, res) => {
  try {
    const partnership = new VendorPartnership(req.body);
    await partnership.save();
    res.status(201).json(partnership);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all vendor partnerships
router.get("/", async (req, res) => {
  try {
    const partnerships = await VendorPartnership.find().populate("supplier_id");
    res.json(partnerships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one vendor partnership by ID
router.get("/:id", async (req, res) => {
  try {
    const partnership = await VendorPartnership.findById(
      req.params.id
    ).populate("supplier_id");
    if (!partnership)
      return res.status(404).json({ error: "Vendor partnership not found" });
    res.json(partnership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE vendor partnership by ID
router.put("/:id", async (req, res) => {
  try {
    const partnership = await VendorPartnership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!partnership)
      return res.status(404).json({ error: "Vendor partnership not found" });
    res.json(partnership);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE vendor partnership by ID
router.delete("/:id", async (req, res) => {
  try {
    const partnership = await VendorPartnership.findByIdAndDelete(
      req.params.id
    );
    if (!partnership)
      return res.status(404).json({ error: "Vendor partnership not found" });
    res.json({ message: "Vendor partnership deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: GET partnerships by supplier
router.get("/supplier/:supplierId", async (req, res) => {
  try {
    const partnerships = await VendorPartnership.find({
      supplier_id: req.params.supplierId,
    }).populate("supplier_id");
    res.json(partnerships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
