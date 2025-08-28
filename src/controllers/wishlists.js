const express = require("express");
const Wishlist = require("../db/wishlist");
const router = express.Router();

// CREATE a wishlist item
router.post("/", async (req, res) => {
  try {
    const wishlistItem = new Wishlist(req.body);
    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all wishlist items
router.get("/", async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find();
    res.json(wishlistItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one wishlist item by ID
router.get("/:id", async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (!wishlistItem)
      return res.status(404).json({ error: "Wishlist item not found" });
    res.json(wishlistItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE wishlist item by ID
router.put("/:id", async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!wishlistItem)
      return res.status(404).json({ error: "Wishlist item not found" });
    res.json(wishlistItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE wishlist item by ID
router.delete("/:id", async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlistItem)
      return res.status(404).json({ error: "Wishlist item not found" });
    res.json({ message: "Wishlist item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: GET wishlist items by customer
router.get("/customer/:customerId", async (req, res) => {
  try {
    const items = await Wishlist.find({ customer_id: req.params.customerId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
