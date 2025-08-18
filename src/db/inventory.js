const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const inventorySchema = new mongoose.Schema({
  inventory_id: { type: Number, unique: true },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Supplier",
  },
  quantity: { type: Number, required: true, min: 0 },
  purchase_price: { type: Number, required: true, min: 0 },
  last_stock_date: { type: Date, default: Date.now },
});

inventorySchema.plugin(AutoIncrement, { inc_field: "inventory_id" });

const Inventory = mongoose.model("Inventory", inventorySchema, "inventory");
module.exports = Inventory;
