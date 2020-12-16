// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Parent = require('../models/parent');
require('dotenv').config();

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded', decoded);

      req.user = await Parent.findById(decoded.id);
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

// Check for admin user routes
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

// Check if a user is a member of staff
const teacher = (req, res, next) => {
  if (req.user && (req.user.role === 'parent' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorised as a teacher user');
  }
};

module.exports = { protect, admin, parent, teacher };
// export { protect };
