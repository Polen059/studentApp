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

router.get('/student', (req, res) => {
  console.log('student');
});
