const mongoose = require("mongoose");
const AcutionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  name: {
    type: String,
  },
  comment: {
    type: String,
  },
  totalprice: {
    type: Number,
  },
  reserveprice: {
    type: Number,
  },
  minimumdistance: {
    type: Number,
  },
  acutiondate: {
    type: Date,
  },
  deliverdate: {
    type: Date,
  },
  enddate: {
    type: Date,
  },
  shippingaddress: {
    type: String,
  },
  bidername: {
    type: String,
  },
  billingamount: {
    type: Number,
  },
  biderDate: {
    type: Date,
  },
});
module.exports = Acution = mongoose.model("acution", AcutionSchema);
