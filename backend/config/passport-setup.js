const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');

// test
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');

// const ExtractJwt = require('passport-jwt').ExtractJwt;
//

passport.serializeUser((user, done) => {
  console.log('serial');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserial');
  User.findById(id).then((user) => {
    console.log('deserial2');
    done(null, user);
  });
});

// Test --------------------------------------------------------------------------------------------------------
// process.setMaxListeners(50);

var opts = {};
opts.jwtFromRequest = function (req) {
  console.log('jwt thing');
  // tell passport to read JWT from cookies
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};
opts.secretOrKey = process.env.COOKIE_KEY;

// main authentication, our app will rely on it
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('JWT BASED AUTH GETTING CALLED'); // called everytime a protected URL is being served
    console.log('jwt1', jwt_payload);
    console.log(jwt_payload.user);

    // TODO ensure check is completed
    // if (CheckUser(jwt_payload.data)) {
    return done(null, jwt_payload.user);
    // } else {
    //   // user account doesnt exists in the DATA
    //   return done(null, false);
    // }
  })
);
// ----------------------------------------------------------------------------------------------------------------------

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // check if user already exists in our own db
      // TODO Check admin and students seperately
      User.findOne({ email: profile.emails[0].value }).then(
        async (currentUser) => {
          if (currentUser) {
            // already have this user

            // Check details exist, add if not
            // TODO Add other fields
            if (!currentUser.displayName) {
              await User.updateOne(
                { email: currentUser.email },
                {
                  $set: {
                    displayName: profile.displayName,
                  },
                }
              );
            }
            console.log('user is: ', currentUser);
            done(null, currentUser);
          } else {
            console.log('No database profile');
            // if not, create user in our db

            if (
              // If profile email address does not start with a 2 digit number
              Number.isInteger(parseInt(profile.emails[0].value.slice(0, 2)))
            ) {
              // Create a student
              new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                forename: profile.name.givenName,
                surname: profile.name.familyName,
                intake: profile.emails[0].value.slice(0, 2),
                role: 'student',
                reportData: [],
              })
                .save()
                .then((newUser) => {
                  done(null, newUser);
                });
            } else {
              // else create a teacher
              new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value,
                forename: profile.name.givenName,
                surname: profile.name.familyName,
                role: 'teacher',
              })
                .save()
                .then((newUser) => {
                  done(null, newUser);
                });
            }
          }
        }
      );
    }
  )
);
