const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  amount: { type: Number, default: 0 },
  usedForPurchase: { type: Number, default: 0 },
  totalBuyPoints: { type: Number, default: 0 },
});

module.exports = mongoose.model("wallet", MessageSchema);
