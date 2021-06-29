const express = require("express");
const Router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../model/user");
const Wallet = require("../model/wallet");
const Odoo = require("odoo-await");
const axios = require("axios");

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let wallet = await Wallet.findOne({ user: req.user.id }).populate("user");
      res.status(200).json(wallet);
    } catch (error) {
      res.send(400).send("Internal Server Error");
    }
  }
);
module.exports = Router;
