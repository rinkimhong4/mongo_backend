const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const currencySchema = new mongoose.Schema({
  // id: { type: Number, unique: true }, // auto-incremented
  currency_name: { type: String, required: true, maxlength: 100 },
  currency_symbol: { type: String, required: true, maxlength: 100 },
  exchange_rate: { type: Number, required: true },
});

// currencySchema.plugin(AutoIncrement, { inc_field: "id" });

const Currency = mongoose.model("currencies", currencySchema);
module.exports = Currency;
