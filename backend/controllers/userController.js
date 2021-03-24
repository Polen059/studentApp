const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/user');
const Parent = require('../models/parent');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Auth User and get token
// POST /api/users/login
// Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Parent.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { _id, email, name, role, children } = user;
    const token = generateToken(_id);
    // console.log('user', user);

    const payload = {
      user: {
        email,
        token,
        name,
        role,
        children,
      },
    };

    // Create cookie and set expiration other one (for Google users) is in userRoutes google/callback
    const cookieToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1w',
    });

    res.cookie('jwt', cookieToken, {
      secure: true,
      httpOnly: true,
    });
    // res.redirect('/parent');
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      children: user.children,
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
  const user = await Parent.findById(req.user._id);

  if (user) {
    res.json({
      email: user.email,
      name: user.name,
      role: user.role,
      students: user.students,
    });
  } else {
    res.status(404);
    res.send('error');
    // throw new Error('User not found');
  }
});

module.exports = { authUser, getUserProfile };
// export { authUser, getUserProfile };
