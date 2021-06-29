const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "conversation",
    required: true,
  },
  date: { type: Date, require: true, default: Date.now() },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("message", schema);

module.exports = Message;
