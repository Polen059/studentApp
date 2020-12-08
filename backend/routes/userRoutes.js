const express = require('express');
require('dotenv').config();
const passport = require('passport');
const router = express.Router();
const authUser = require('../controllers/userController').authUser;
const getUserProfile = require('../controllers/userController').getUserProfile;
const protect = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
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

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
// Experimental Google Routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })
);

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
      },
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '5m',
      }
      // (err, token) => {
      //   console.log('signed token', token);
      //   res.json({
      //     token,
      //   });
      // }
    );

    res.cookie('jwt', token);

    // console.log('/google/redirect', req.user);

    res.redirect('http://localhost:3000/');
  })
);

router.get('/logout', (req, res) => {
  console.log(req);
  console.log(req.session);

  req.session = null;
  req.logout();
  const homeURL = encodeURIComponent('http://localhost:3000/');
  // res.redirect(
  //   `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${homeURL}&client_id=${process.env.AUTH0_CLIENT_ID}`
  // );
});

router.get(
  '/current-session',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.cookies.jwt);
    if (req.user) {
      console.log('found');
      res.json({
        user: req.user,
      });
    }
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
