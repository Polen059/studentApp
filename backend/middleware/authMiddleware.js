// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

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

      req.user = await User.findById(decoded.id);
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

module.exports = protect;
// export { protect };
