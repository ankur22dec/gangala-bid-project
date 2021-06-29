const mongoose = require("mongoose");

const WishList = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    status: { type: String, default: "active" },
    createsAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("wishlist", WishList);
