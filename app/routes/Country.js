const express = require("express");
const router = express.Router();
const axios = require("axios");
const publicIp = require("public-ip");

var ip = require("ip");
var geoip = require("geoip-lite");
const Address = require("../model/address");
const User = require("../model/user");
const { protect } = require("../middleware/auth");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
  try {
    // const userId = req.tokenData.userId;
    const country = await axios.get(
      "http://ipwhois.pro/json/?key=WgesGODgjdhblUP6"
    );
    console.log(country);
    res.status(200).send(country.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
    // return res.status(400).json({ success: false, error: "Not Found" });
  }
});

module.exports = router;
