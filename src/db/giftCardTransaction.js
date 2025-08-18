const mongoose = require("mongoose");

const giftCardTransactionSchema = new mongoose.Schema({
  giftcard_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "GiftCard",
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  amount: { type: Number, required: true, min: 0 },
  transaction_date: { type: Date, default: Date.now },
});

const GiftCardTransaction = mongoose.model(
  "GiftCardTransaction",
  giftCardTransactionSchema,
  "giftCardTransactions"
);
module.exports = GiftCardTransaction;
