const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  profile: { type: String },
  primaryAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address"
  },
  email: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  login: {
    type: String,
    default: "null",
  },
  password: {
    type: String,
    default: "null",
    required: true,
    select: false
  },
  waNumber: {
    type: Number,
  },
  seller: {
    type: Boolean,
    default: false,
  },
  country: {
    type: String,
  },
  company_id: {
    type: String,
    default: "null",
  },
  partner_id: {
    type: String,
    default: "null",
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  signature: {
    type: String,
    default: "null",
  },
  action_id: {
    type: String,
    default: "null",
  },
  share: {
    type: Boolean,
    default: false,
  },
  resettoken: { type: String },
  expiretoken: { type: Date },
  create_uid: {
    type: String,
    default: "null",
  },
  write_uid: {
    type: String,
    default: "null",
  },
  write_date: {
    type: Date,
  },
  alias_id: {
    type: String,
    default: "null",
  },
  notification_type: {
    type: String,
  },
  out_of_office_message: {
    type: String,
    default: "null",
  },
  odoobot_state: {
    type: String,
    default: "null",
  },
  website_id: {
    type: String,
    default: "null",
  },
  sale_team_id: {
    type: String,
    default: "null",
  },
  target_sales_won: {
    type: String,
    default: "null",
  },
  target_sales_done: {
    type: String,
    default: "null",
  },
  target_sales_invoiced: {
    type: String,
    default: "null",
  },
  karma: {
    type: String,
    default: "null",
  },
  rank_id: {
    type: String,
    default: "null",
  },
  next_rank_id: {
    type: String,
    default: "null",
  },
  oauth_provider_id: {
    type: String,
    default: "null",
  },
  oauth_uid: {
    type: String,
    default: "null",
  },
  oauth_access_token: {
    type: String,
    default: "null",
  },
  livechat_username: {
    type: String,
    default: "null",
  },
});
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    console.log({ err, isMatch });
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};


// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password, (err, isMatch) => {
//     if (err) {
//       return err;
//     } else {
//       return isMatch;
//     }
//   })
// }


UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

module.exports = User = mongoose.model("user", UserSchema);
