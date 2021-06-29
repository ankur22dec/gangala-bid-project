require("dotenv").config();

var nodemailer = require("nodemailer");
let password = `${process.env.emailPassword}`;
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "gangalain5@gmail.com",
    pass: password, // your password
  },
});

module.exports = transporter;
