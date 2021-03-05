// import passport from 'passport';
// import GoogleStrategy from 'passport-google-oauth20';
// import * as JwtStrategy from 'passport-jwt';
// // import { ExtractJwt, JwtStrategy } from 'passport-jwt';
// import dotenv from 'dotenv';
// import User from '../models/userModel.js';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const dotenv = require('dotenv');
const User = require('../models/user');
const mongoose = require('mongoose');

dotenv.config();

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

// Middleware -
var opts = {};
opts.jwtFromRequest = function (req) {
  console.log('opts.jwtFromRequest');
  // tell passport to read JWT from cookies
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  console.log('token', token);
  return token;
};
opts.secretOrKey = process.env.JWT_SECRET;

// main authentication, our app will rely on it
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('JwtStrategy'); // called everytime a protected URL is being served
    console.log('jwt_payload', jwt_payload);

    // TODO ensure check is completed
    // if (CheckUser(jwt_payload.data)) {
    return done(null, jwt_payload.user);
    // } else {
    //   // user account doesnt exists in the DATA
    //   return done(null, false);
    // }
  })
);

// Google OAuth Strategy callback
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/api/users/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.emails[0].value);
      console.log('profile', profile);

      User.findOne({ email: profile.emails[0].value }).then(
        async (currentUser) => {
          // check if user already exists in our own db
          if (currentUser) {
            console.log('Current User', currentUser);
            done(null, currentUser);
          } else {
            // Create a new user (TODO only for staff)
            new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              // isAdmin: false,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        }
      );
    }
  )
);
