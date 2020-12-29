// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Parent = require('../models/parent');
require('dotenv').config();

// Checks cookie for role being member of staff (teacher or admin)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Tests for the cookie
  // console.log('header', req.headers);
  // console.log('header cookie header', req.headers.cookie);
  // console.log('header cookie', req.cookies.jwt);
  // console.log('header auth', req.headers.authorization);

  if (
    //  -- Original Bearer Token authentication --
    // req.headers.authorization &&
    // req.headers.authorization.startsWith('Bearer')
    req.headers.cookie
  ) {
    try {
      // token = req.headers.authorization.split(' ')[1];
      token = req.headers.cookie.split('=')[1];

      // Get decoded user from the verified token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Destructure the user from the decoded object
      const { user } = decoded;

      // Check if user is teacher or admin
      if (user.role !== 'teacher' && user.role !== 'admin') {
        console.log('not staff');
        throw new Error('Student...');
      }

      // Not sure why I put this here...
      // req.user = await Parent.findById(decoded.id);
      // .select('-password');
      next();
    } catch (error) {
      res.status(401);
      // throw new Error('token failed');
    }
  }

  if (!token) {
    res.status(401);
    // throw new Error('No token');
  }
});

// Check for admin user routes --> TODO
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorised as an admin user');
  }
};

// Check for a parent user
const parent = (req, res, next) => {
  // Decode users cookie
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // If user exists, is valid and is a parent, continue
  if (decoded.user && decoded.user.role === 'parent') {
    console.log('Parent access granted');
    next();
  } else {
    res.status(401);
    throw new Error('Not authorised as an parent user');
  }
};

// Check if a user is a member of staff TODO
const teacher = (req, res, next) => {
  if (req.user && (req.user.role === 'parent' || req.user.role === 'admin')) {
    next();
  } else {
    console.log('user is staff');
    res.status(401);
    throw new Error('Not authorised as a teacher user');
  }
};

module.exports = { protect, admin, parent, teacher };
// export { protect };
