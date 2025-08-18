const mongoose = require("mongoose");

const vendorPartnershipSchema = new mongoose.Schema({
  vendor_name: { type: String, required: true, maxlength: 100 },
  contract_start: { type: Date, required: true },
  contract_end: { type: Date, required: true },
});

const VendorPartnership = mongoose.model(
  "VendorPartnership",
  vendorPartnershipSchema,
  "vendorPartnerships"
);
module.exports = VendorPartnership;
