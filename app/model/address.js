const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({

    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    address3: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = Address = mongoose.model("address", AddressSchema);
