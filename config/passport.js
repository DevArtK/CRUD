//Bring in google oAuth Module
const passport = require("passport");
const GUser = require("../models/GUser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
// User model is needed beacuse we are dealing with a db
const User = require("../models/");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        new GUser({
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }).save();
        try {
          let GUser = await GUser.findOne({ googleId: profile.id });

          if (user) {
            done(null, GUser);
          } else {
            User = await Guser.create(newGUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
// module.exports = (GooglePassport) => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//       },
//       (accessToken, refreshToken, profile, done) => {
//         console.log("passport callback fired");
//         console.log(profile);
//         new User({
//           username: profile.displayName,
//           googleId: profile.id,
//         })
//           .save()
//           .then((newUser1) => {
//             console.log("new user created" + newUser);
//           });
//       }
//     )
//   );
// };
// module.exports = (passportLogIn) => {
//   passport.use(
//     new GoogleStrategy((name, password, done) => {

//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",

//       //match name
//       let query = { name: name };
//       User.findOne(query, (err, user) => {
//         if (err) throw err;
//         if (!user) {
//           return null, false, { message: "No User Found" };
//         }
//       });
//     })
//   );
// };
module.export = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    GUser.findById(id, (err, user) => done(err, user));
  });
};
