const express = require("express");
const Inventory = require("../db/inventory");
const Product = require("../db/product");
const Supplier = require("../db/supplier");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { product_id, supplier_id } = req.body;
    const product = await Product.findById(product_id);
    const supplier = await Supplier.findById(supplier_id);
    if (!product) return res.status(400).json({ error: "Invalid product_id" });
    if (!supplier)
      return res.status(400).json({ error: "Invalid supplier_id" });

    const inventory = new Inventory(req.body);
    await inventory.save();
    await Product.findByIdAndUpdate(product_id, {
      $inc: { stock_quantity: req.body.quantity },
    });
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate("product_id")
      .populate("supplier_id");
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one
router.get("/:id", async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ inventory_id: req.params.id })
      .populate("product_id")
      .populate("supplier_id");
    if (!inventory)
      return res.status(404).json({ error: "Inventory not found" });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { product_id, supplier_id, quantity } = req.body;
    if (product_id) {
      const product = await Product.findById(product_id);
      if (!product)
        return res.status(400).json({ error: "Invalid product_id" });
    }
    if (supplier_id) {
      const supplier = await Supplier.findById(supplier_id);
      if (!supplier)
        return res.status(400).json({ error: "Invalid supplier_id" });
    }

    const inventory = await Inventory.findOne({ inventory_id: req.params.id });
    if (!inventory)
      return res.status(404).json({ error: "Inventory not found" });

    const oldQuantity = inventory.quantity;
    const update = await Inventory.findOneAndUpdate(
      { inventory_id: req.params.id },
      req.body,
      { new: true }
    );

    if (quantity && product_id === inventory.product_id) {
      const quantityDiff = quantity - oldQuantity;
      await Product.findByIdAndUpdate(product_id, {
        $inc: { stock_quantity: quantityDiff },
      });
    }

    res.json(update);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const inventory = await Inventory.findOneAndDelete({
      inventory_id: req.params.id,
    });
    if (!inventory)
      return res.status(404).json({ error: "Inventory not found" });

    await Product.findByIdAndUpdate(inventory.product_id, {
      $inc: { stock_quantity: -inventory.quantity },
    });

    res.json({ message: "Inventory deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
