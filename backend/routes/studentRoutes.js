const express = require('express');
// const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const router = express.Router();
const authUser = require('../controllers/userController').authUser;
const getUserProfile = require('../controllers/userController').getUserProfile;
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const JwtStrategy = require('passport-jwt').Strategy;

router.post(
  '/',

  asyncHandler(async (req, res) => {
    const { _id } = req.body;
    console.log('student', _id);
    // Decode user
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Access children array
    // const { _id } = decoded.user;

    // Find all children users in the array
    studentData = await User.findById(_id);
    console.log('data', studentData);
    // Return data response to redux

    res.json(studentData);
  })
);

module.exports = router;
