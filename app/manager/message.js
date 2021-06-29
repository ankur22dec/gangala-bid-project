const Message = require("../model/message");

const Manager = {
  create: async t => {
    let message = new Message({ ...t });
    message = await message.save();
    return message ? message : false;
  },
  getByConversationId: async conversationId => {
    let t = await Message.find({ conversationId: conversationId });
    return t ? t : false;
  },
};

module.exports = Manager;
