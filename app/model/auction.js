const mongoose = require("mongoose");
const AuctionSchema = new mongoose.Schema({
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  name: {
    type: String,
  },
  auction_name: {
    type: String,
    default: "null",
  },

  description: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  sequence: {
    type: String,
  },
  state: {
    type: String,
  },
  intial_price: {
    type: String,
  },
  reserve_price: {
    type: String,
  },
  current_price: {
    type: String,
  },
  total_bids: {
    type: String,
  },
  total_duration: {
    type: String,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  extend_by: {
    type: String,
    default: "null",
  },
  product_sale: {
    type: Boolean,
    default: true,
  },
  reverse_auction_line_ids: {
    type: String,
  },
  subscriber_ids: {
    type: String,
  },
  order_id: {
    type: String,
  },
  bid_decrement_rule_ids: {
    type: String,
  },
  bidder_ids: {
    type: String,
  },
  notify_before_expire: { type: Boolean, default: true },
  notify_before: { type: Number, default: 15 },
  expire_note_send: { type: String, default: null },
  notify_ab_bid_overbid: { type: Boolean, default: true },
  notify_ab_bid_placed: { type: Boolean, default: true },
  notify_s_auction_running: { type: Boolean, default: true },
  notify_s_auction_extended: { type: Boolean, default: true },
  notify_s_auction_closed: { type: Boolean, default: true },
  notify_s_new_bid: { type: Boolean, default: true },
  notify_s_auction_completed: { type: Boolean, default: true },
  notify_w_auction_completed: { type: Boolean, default: true },
  notify_l_auction_completed: { type: Boolean, default: true },
});
module.exports = Auction = mongoose.model("auction", AuctionSchema);
