// import asyncHandler from 'express-async-handler';
// import generateToken from '../utils/generateToken.js';
// import User from '../models/userModel.js';

const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Auth User and get token
// POST /api/users/login
// Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { _id, name, email, isAdmin } = user;
    const token = generateToken(_id);

    const payload = {
      user: {
        _id,
        name,
        email,
        isAdmin,
        token,
      },
    };

    const cookieToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '5m',
    });

    res.cookie('jwt', cookieToken);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.send('error');
    // throw new Error('Invalid email or password');
  }
});

// Get User profile
// POST /api/users/profile
// Private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log('/api/users/profile');
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    res.send('error');
    // throw new Error('User not found');
  }
});

module.exports = { authUser, getUserProfile };
// export { authUser, getUserProfile };
