const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { multerUploads, dataUri } = require("../upload");
const mailer = require("../config/mailer");
const { uploader } = require("../config/cloudinaryConfiguration");
const JWT = require("jsonwebtoken");
const User = require("../model/user");
const Wallet = require("../model/wallet");
const Odoo = require("odoo-await");
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { protect } = require('../middleware/auth');
const odoo = new Odoo({
  baseUrl: process.env.ODOO_BASE_URL,
  port: process.env.ODOO_PORT,
  db: process.env.ODOO_DB,
  username: process.env.ODOO_USERNAME,
  password: process.env.ODOO_PASSWORD,
});

const signToken = userID => {
  return JWT.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", async (req, mainResponse) => {
  try {
    const res = await odoo.connect();
    let createOdoo;
    let newUserMongo;
    let newUser = null;
    const { username, name, password } = req.body;
    const response = await User.findOne({ email: username });
    if (response)
      return mainResponse
        .status(400)
        .send("User Is Already Register With This Email");
    else {
      newUserMongo = new User({ name, password, email: username });
    }
    const us = await newUserMongo.save();
    let wallet = new Wallet({
      user: us.id,
    });
    await wallet.save();
    const token = us.getSignedJwtToken();
    console.log(token)
    mainResponse.status(200).json({ message: "User Succesfully Register", token: token, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server Error");
  }
});
userRouter.put("/updateProfile", async (req, res) => {
  try {
    let { name, id } = req.body;
    const updateUser = await User.findByIdAndUpdate(id, { name });
    if (updateUser) {
      console.log("uu", updateUser);
      res.status(200).json({
        success: true,
        message: "User Update Successfully",
        data: updateUser,
      });
    } else {
      res.status(400).send("Internal Server Error");
    }
  } catch (err) {
    res.status(400).send("Internal Server Error");
  }
});
userRouter.put("/updatePrimaryAddressId", protect, async (req, res) => {
  try {
    let { addressId } = req.body;
    const updateUser = await User.findByIdAndUpdate(req.user.id, { primaryAddressId: addressId });
    if (updateUser) {
      res.status(200).json({
        success: true,
        message: "User Update Successfully",
        data: updateUser,
      });
    } else {
      res.status(400).send("Internal Server Error");
    }
  } catch (err) {
    res.status(400).send("Internal Server Error");
  }
});

userRouter.post("/sellerRegister", async (req, mainResponse) => {
  try {
    let newUserMongo;
    const userObj = {
      ...req.body,
      seller: true,
    };
    console.log(userObj);
    const response = await User.findOne({ email: userObj.email });
    console.log(response);
    if (response)
      return mainResponse
        .status(400)
        .send("Seller Is Already Register With This Email");
    else {
      newUserMongo = new User(userObj);
    }
    const us = await newUserMongo.save();
    let wallet = new Wallet({
      user: us.id,
    });
    await wallet.save();
    mainResponse
      .status(200)
      .json({ message: " Succesfully Registered As a Seller" });
  } catch (error) {
    console.log(error);
    mainResponse.status(400).send("Internal Server Error");
  }
});
userRouter.post(
  "/upload/sellerProfile",
  protect,
  multerUploads,
  async (req, res) => {
    console.log("running");
    if (req.file) {
      const file = dataUri(req).content;
      return uploader
        .upload(file)
        .then(result => {
          console.log(result);
          const image = result.url;
          var query = { _id: req.user.id };
          var update = { profile: image };
          var options = { new: true };
          User.findOneAndUpdate(query, update, options)
            .then(user => {
              return res.status(200).json({ response: true });
            })
            .catch(err1 => {
              console.log(err1);
              res.status(400).send("Internal Server Error");
            });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({
            messge: "someting went wrong while processing your request",
            data: {
              err,
            },
          });
        });
    }
  }
);
userRouter.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    console.log(req.form);
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resettoken = token;
      user.expiretoken = Date.now() + 3600000;
      user.save().then(result => {
        mailer.sendMail({
          to: user.email,
          from: "no-replay@insta.com",
          subject: "password reset",
          html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                     `,
        });
        res.json({ msg: "check your email" });
      });
    });
  });
});
userRouter.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resettoken: sentToken, expiretoken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then(hashedpassword => {
        user.password = hashedpassword;
        user.resettoken = undefined;
        user.expiretoken = undefined;
        user.save().then(saveduser => {
          res.json({ msg: "password updated success" });
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
});
userRouter.get("/me", protect, async (req, res, next) => {
  try {
    console.log("here")
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    console.log("here2")
    return res.status(400).json({ success: false, error: "Not Authorized" })
  }
})
userRouter.post(
  "/login",
  // passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    console.log("REQ", req.body)
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Please provice username and password." })
    }
    let user = await User.findOne({ email: username }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid credentials." });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ success: false, error: "Invalid credentials." })
    }

    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token, data: user })


    // if (req.isAuthenticated()) {
    //   const { _id } = req.user;
    //   const token = signToken(_id);
    //   res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    //   res.status(200).json(req.user);
    // } else {
    //   res.status(400).send("Internal Server Error");
    // }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logout Successfully" });
  }
);

userRouter.get(
  "/authenticated",
  protect,
  async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    })
  }
);
const client = new OAuth2Client('70870950823-tg4shcbd7geqqgh2072apmi7m06mqhbg.apps.googleusercontent.com')


userRouter.post('/loginwithoutpassword', (req, res) => {
  const { username } = req.body;
  User.findOne({ email: username }).exec((err, user) => {
    if (user) {
      const token = user.getSignedJwtToken();
      return res.status(200).json({ success: true, token, data: user });
    } else {
      return res.status(400).json({ success: false, error: "User Not exist" });
    }
  });
})

userRouter.post('/google-login', (req, res) => {
  const { idToken } = req.body;
  client.verifyIdToken({ idToken, audience: '70870950823-tg4shcbd7geqqgh2072apmi7m06mqhbg.apps.googleusercontent.com' }).then(response => {
    console.log('GOOGLE LOGIN RESPONSE', response)
    const { email_verified, name, email } = response.payload;
    if (email_verified) {
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          const token = user.getSignedJwtToken();
          const { _id, email, name } = user;
          return res.status(200).json({ success: true, token, data: user })
        } else {
          let password = email + process.env.JWT_SECRET;
          user = new User({ name, email, password });
          user.save((err, data) => {
            if (err) {
              console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
              return res.status(400).json({
                error: 'User signup failed with google'
              });
            }
            const token = user.getSignedJwtToken();
            const { _id, email, name } = data;
            return res.status(200).json({ success: true, token, data: user })

          });
        }
      });
    } else {
      return res.status(400).json({
        error: 'Google login failed. Try again'
      });
    }

  })
})
userRouter.post('/facebook-login', (req, res) => {
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => console.log("getting data or not", response))
      .then(response => {
        const { email, name } = response;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            console.log("user========>", user)
            user.getSignedJwtToken();
            const { _id, email, name } = user;

            return res.status(200).json({ success: true, token, data: user })

          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with facebook'
                });
              }
              user.getSignedJwtToken();
              const { _id, email, name } = data;
              console.log('user save successfully', err);

              return res.status(200).json({ success: true, token, data: user })
            });
          }
        });
      })
      .catch(error => {
        res.json({
          error: 'Facebook login failed. Try later'
        });
      })
  );
});
module.exports = userRouter;
