const mongoose = require("mongoose");

const storeLocationSchema = new mongoose.Schema({
  store_name: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: true, maxlength: 200 },
  city: { type: String, required: true, maxlength: 100 },
  country: { type: String, required: true, maxlength: 100 },
});

const StoreLocation = mongoose.model(
  "StoreLocation",
  storeLocationSchema,
  "storeLocations"
);
module.exports = StoreLocation;
