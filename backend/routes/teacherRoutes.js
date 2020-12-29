const express = require('express');
// const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const router = express.Router();
const authUser = require('../controllers/userController').authUser;
const getUserProfile = require('../controllers/userController').getUserProfile;
const { protect, teacher } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const JwtStrategy = require('passport-jwt').Strategy;

// @Route Post api/teachers/searchStudents
// @Desc Send intake and name and get back array of students
// @Access Private/teachers & admin
router.get(
  '/searchStudents',
  protect,
  asyncHandler(async (req, res) => {
    // Get data from the header for use in query
    // Note uses Query instead of body for the params
    console.log(req.query);
    const { intake, name } = req.query;

    // Use intake to filter staff
    // Regex name for ease of use
    let students;

    // Check users input.  If no year is chosen ensure only students are returned
    if (intake && name) {
      students = await User.find({
        intake,
        name: { $regex: name, $options: 'i' },
      });
    } else if (intake) {
      students = await User.find({
        intake,
      });
    } else if (name) {
      students = await User.find({
        role: 'student',
        name: { $regex: name, $options: 'i' },
      });
    } else {
      res.status(400);
      res.send('No search string');
    }

    console.log('found students', students);

    // Return array of students
    // TODO sort issue of no students being returned
    if (students) {
      // Array with at least one student???
      res.json(students);
    } else {
      // Empty array
      res.status(404);
      res.send('errorrr');
    }
  })
);

module.exports = router;
