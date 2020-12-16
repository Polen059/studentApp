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
const { parent } = require('../middleware/authMiddleware');

// @Route Get api/parents
// @Desc Get a parents' students grade data
// @Access Privite/parents
router.get(
  '/',
  parent,
  asyncHandler(async (req, res) => {
    // Decode user
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Access children array
    const { children } = decoded.user;

    // Find all children users in the array
    studentData = await User.find({ email: children });

    // Return data response to redux
    res.json(studentData);
  })
);

module.exports = router;
