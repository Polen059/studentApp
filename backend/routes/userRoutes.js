const express = require('express');
// const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const router = express.Router();
const authUser = require('../controllers/userController').authUser;
const getUserProfile = require('../controllers/userController').getUserProfile;
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
// const User = require('../models/user');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const JwtStrategy = require('passport-jwt').Strategy;

// import express from 'express';
// import dotenv from 'dotenv';
// import passport from 'passport';
// const router = express.Router();
// import { authUser, getUserProfile } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';
// import jwt from 'jsonwebtoken';
// import generateToken from '../utils/generateToken.js';
// dotenv.config();

// @Route POST api/users/login
// @Desc User sends username and password
// @Access public
router.post('/login', authUser);

// @Route GET api/users/profile
// @Desc Return users profile
// @Access private
router.route('/profile').get(protect, getUserProfile);

// @Route GET api/users/google
// @Desc Initial route for Google OAuth
// @Access public
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })
);

// @Route GET api/users/google/callback
// @Desc Callback route for an authenticated Google user
// @Access public
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  asyncHandler(async (req, res) => {
    // res.redirect('/dashboard');
    console.log('callback', req.user);
    const { email } = req.user;
    // const user = await User.findOne({ email });

    const payload = {
      user: {
        email: req.user.email,
        id: req.user._id,
        name: req.user.name,
        role: req.user.role,
      },
    };

    // Create a token with user details
    // Create cookie and set expiration other one (for parent users) is in userControllers authUser
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1w',
      }
      // (err, token) => {
      //   console.log('signed token', token);
      //   res.json({
      //     token,
      //   });
      // }
    );
    // Set the cookie containing the jwt token
    res.cookie('jwt', token);

    if (process.env.NODE_ENV === 'production') {
      // Production routes
      if (req.user.role === 'student') {
        res.redirect(`/report/${req.user._id}`);
      } else if (req.user.role === 'admin') {
        res.redirect(`/findstudent`);
      } else if (req.user.role === 'teacher') {
        res.redirect(`/findstudent`);
      } else {
        // Otherwise send to root
        res.redirect('/');
      }
    } else {
      // Development routes
      if (req.user.role === 'student') {
        res.redirect(`http://localhost:3000/report/${req.user._id}`);
      } else if (req.user.role === 'admin') {
        res.redirect(`http://localhost:3000/findstudent`);
      } else if (req.user.role === 'teacher') {
        res.redirect(`http://localhost:3000/findstudent`);
      } else {
        // Otherwise send to root
        res.redirect('http://localhost:3000/');
      }
    }
  })
);

// @Route GET api/users/logout
// @Desc User logout
// @Access public
router.get('/logout', (req, res) => {
  console.log('logout');
  // req.session = null;
  res.session = null;
  // req.session.destroy();
  // res.cookies = null;
  req.logout();
  // res.end();
  res.clearCookie('jwt');
  res.redirect('http://localhost:3000/');
  // const homeURL = encodeURIComponent('http://localhost:3000/');
  // res.redirect(
  //   `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${homeURL}&client_id=${process.env.AUTH0_CLIENT_ID}`
  // );
});

// @Route GET api/users/current-session
// @Desc Called on page update, check user and return user details
// @Access public
router.get(
  '/current-session',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('Current session jwt', req.cookies.jwt);
    console.log('User', req.user);

    // Verify users jwt token
    const dec = jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        // If token is not valid
        // TODO ENSURE ONLY VALID VERIFY SENDS BACK
        if (err) {
          console.log('error', err);
        }
        let user;

        // decoded is user object
        const [username, domain] = decoded.user.email.split('@');

        // Domain check for parents or teacher/student
        if (domain === 'frieslandschool.com') {
          user = await User.findOne({ email: decoded.user.email });
        } else {
          user = await Parent.findOne({ email: decoded.user.email });
        }

        const { _id, email, role, name, reportData, children } = user;

        // Send back to frontend and redux
        res.json({
          _id,
          email,
          name,
          role,
          reportData,
          children,
        });
      }
    );
    // if (req.user) {
    //   console.log('found');
    //   res.json({
    //     email,
    //     name,
    //     role,
    //     reportData,
    //   });
    // }

    // jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
    //   if (err) {
    //     res.sendStatus(403);
    //   } else {
    //     res.json({
    //       message: 'post Created',
    //       data,
    //     });
    //   }
    // });

    // const token = req.cookies.session_token;
    // console.log('Current session', req.user);
    // res.json({
    //   _id: req.user._id,
    //   name: req.user.name,
    //   email: req.user.email,
    //   isAdmin: req.user.isAdmin,
    //   token: generateToken(req.user._id),
    // });

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);

    // passport.authenticate('google', { session: false }, (err, user) => {
    //   console.log(user);
    //   if (err || !user) {
    //     res.send(false);
    //   } else {
    //     res.send(user);
    //   }
    // })(req, res);
  }
);

module.exports = router;
// export default router;
