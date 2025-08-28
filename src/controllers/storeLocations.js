const express = require("express");
const StoreLocation = require("../db/storeLocation");
const router = express.Router();

// CREATE a store location
router.post("/", async (req, res) => {
  try {
    const storeLocation = new StoreLocation(req.body);
    await storeLocation.save();
    res.status(201).json(storeLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all store locations
router.get("/", async (req, res) => {
  try {
    const storeLocations = await StoreLocation.find();
    res.json(storeLocations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one store location by ID
router.get("/:id", async (req, res) => {
  try {
    const storeLocation = await StoreLocation.findById(req.params.id);
    if (!storeLocation)
      return res.status(404).json({ error: "Store location not found" });
    res.json(storeLocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE store location by ID
router.put("/:id", async (req, res) => {
  try {
    const storeLocation = await StoreLocation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!storeLocation)
      return res.status(404).json({ error: "Store location not found" });
    res.json(storeLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE store location by ID
router.delete("/:id", async (req, res) => {
  try {
    const storeLocation = await StoreLocation.findByIdAndDelete(req.params.id);
    if (!storeLocation)
      return res.status(404).json({ error: "Store location not found" });
    res.json({ message: "Store location deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
