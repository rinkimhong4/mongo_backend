const mongoose = require("mongoose");

const storeLocationSchema = new mongoose.Schema({
  store_name: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  manager: { type: String, required: true },
  opening_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

const StoreLocation = mongoose.model(
  "StoreLocation",
  storeLocationSchema,
  "storeLocations" // collection name
);

module.exports = StoreLocation;
