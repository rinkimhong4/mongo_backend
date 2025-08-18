const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const giftCardsSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  card_code: { type: String, required: true, maxlength: 100, unique: true },
  balance: { type: Number, required: true, min: 0 },
  expiration_date: { type: Date, default: Date.now },
});

giftCardsSchema.plugin(AutoIncrement, { inc_field: "id" });

const GiftCards = mongoose.model("GiftCards", giftCardsSchema, "giftCards");

module.exports = GiftCards;
