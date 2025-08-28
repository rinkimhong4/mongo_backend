const express = require("express");
const ProductImage = require("../db/productImage"); // correct import
const router = express.Router();

// CREATE a product image
router.post("/", async (req, res) => {
  try {
    const image = new ProductImage(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all product images
router.get("/", async (req, res) => {
  try {
    const images = await ProductImage.find().populate("product_id");
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one product image by ID
router.get("/:id", async (req, res) => {
  try {
    const image = await ProductImage.findById(req.params.id).populate(
      "product_id"
    );
    if (!image)
      return res.status(404).json({ error: "Product image not found" });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product image by ID
router.put("/:id", async (req, res) => {
  try {
    const image = await ProductImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!image)
      return res.status(404).json({ error: "Product image not found" });
    res.json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product image by ID
router.delete("/:id", async (req, res) => {
  try {
    const image = await ProductImage.findByIdAndDelete(req.params.id);
    if (!image)
      return res.status(404).json({ error: "Product image not found" });
    res.json({ message: "Product image deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: GET images by product
router.get("/product/:productId", async (req, res) => {
  try {
    const images = await ProductImage.find({
      product_id: req.params.productId,
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
