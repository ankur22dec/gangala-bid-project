const express = require('express');
const router = express.Router();
const Address = require('../model/address');
const User = require('../model/user');
const { protect } = require('../middleware/auth')
const mongoose = require("mongoose");


router.post('/', protect, async (req, res) => {
  try {
    const newAddress = new Address({
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode,
      user: req.user.id
    });
    console.log("req.user.id", req.user.id)
    const address = await newAddress.save();
    res.status(200).json({ success: true, data: address });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);


router.put('/', protect, async (req, res) => {
  try {
    const updateAddress = {
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode,
      user: req.user.id
    };
    const id = req.body.addressId
    // console.log("req.user.id",req.user.id)
    const address = await Address.findByIdAndUpdate(id, updateAddress);
    res.status(200).json({ success: true, data: address });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

router.get("/", protect, async (req, res, next) => {
  try {
    // const userId = req.tokenData.userId;
    const address = await Address.find({ user: mongoose.Types.ObjectId(req.user.id) });
    res.status(200).json({
      success: true,
      data: address
    })
  } catch (error) {
    return res.status(400).json({ success: false, error: "Not Found" })
  }
})

module.exports = router;
