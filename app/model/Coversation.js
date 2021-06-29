const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  joined: { type: Date, require: false, default: Date.now() },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const Conversation = mongoose.model("conversation", schema);

module.exports = Conversation;
