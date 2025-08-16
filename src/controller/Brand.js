const Brand = require("../model/Brand");

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get brand by brand_id
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findOne({ brand_id: req.params.id });
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new brand
exports.createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a brand
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findOneAndUpdate(
      { brand_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a brand
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findOneAndDelete({ brand_id: req.params.id });
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json({ message: "Brand deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
