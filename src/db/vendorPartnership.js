const mongoose = require("mongoose");

const vendorPartnershipSchema = new mongoose.Schema({
  vendor_name: { type: String, required: true, maxlength: 100 },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Supplier",
  },
  contract_start: { type: Date, required: true },
  contract_end: { type: Date, required: true },
  status: { type: String, default: "active" },
  created_at: { type: Date, default: Date.now },
});

const VendorPartnership = mongoose.model(
  "VendorPartnership",
  vendorPartnershipSchema,
  "vendorPartnerships"
);

module.exports = VendorPartnership;
