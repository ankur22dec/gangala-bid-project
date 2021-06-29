const Conversation = require("../model/Coversation");
const mongoose = require("mongoose");

const Manager = {
  create: async t => {
    let alreadyExists = await Conversation.find({
      members: { $all: t.members },
    });

    if (alreadyExists.length > 0) return alreadyExists[0];

    let conversation = new Conversation({ ...t });
    conversation = await conversation.save();
    return conversation ? conversation : false;
  },

  getMembersById: async conversationId => {
    let t = await Conversation.findById(conversationId);
    return t ? t.members : false;
  },

  getAll: async userId => {
    let t = await Conversation.aggregate([
      {
        $match: {
          members: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: `users`,
          localField: `members`,
          foreignField: `_id`,
          as: `members`,
        },
      },
      {
        $lookup: {
          from: `messages`,
          localField: `_id`,
          foreignField: `conversationId`,
          as: `messages`,
        },
      },
    ]).sort({ "messages.date": -1 });

    t = t
      .map(x => {
        let recentMessages = x.messages.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        return {
          _id: x._id,
          joined: x.joined,
          members: x.members,
          subtitle: recentMessages.length > 0 ? recentMessages[0].body : ``,
          recentDate: recentMessages.length > 0 ? recentMessages[0].date : ``,
        };
      })
      .sort((a, b) => new Date(b.recentDate) - new Date(a.recentDate));

    return t;
  },

  // getAll: async userId => {
  //     let t = await Conversation.aggregate([
  //         {
  //             $match: {
  //                 members: mongoose.Types.ObjectId(userId)
  //             }
  //         },
  //         {
  //             $lookup: {
  //                 from: `users`,
  //                 localField: `members`,
  //                 foreignField: `_id`,
  //                 as: `members`
  //             }
  //         },
  //         {
  //             $lookup: {
  //                 from: `messages`,
  //                 localField: `_id`,
  //                 foreignField: `conversationId`,
  //                 as: `messages`
  //             }
  //         },
  //     ]);
  //     return t;
  // }
};

module.exports = Manager;
