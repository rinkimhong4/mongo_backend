const express = require("express");
const router = express.Router();
const Review = require("../db/review");

// CREATE a review
router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("customer_id")
      .populate("product_id");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("customer_id")
      .populate("product_id");
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a review by ID
router.put("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a review by ID
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET reviews by product
router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      product_id: req.params.productId,
    }).populate("customer_id");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET reviews by customer
router.get("/customer/:customerId", async (req, res) => {
  try {
    const reviews = await Review.find({
      customer_id: req.params.customerId,
    }).populate("product_id");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
