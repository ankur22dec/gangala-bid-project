const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./model/user");

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "NoobCoder",
    },
    (payload, done) => {
      console.log(payload.sub);
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

// authenticated local strategy using username and password
passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(username);
    User.findOne({ email: username }, (err, user) => {
      // something went wrong with database
      console.log(err);
      if (err) return done(err);
      // if no user exist
      if (!user) {
        console.log("mahad");
        return done(null, false);
      }
      // check if password is correct
      user.comparePassword(password, done);
    });
  })
);
