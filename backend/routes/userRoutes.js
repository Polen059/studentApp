const express = require('express');
// const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const router = express.Router();
const authUser = require('../controllers/userController').authUser;
const getUserProfile = require('../controllers/userController').getUserProfile;
const { protect } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// @Route POST api/users/login
// @Desc User sends username and password
// @Access public
router.post('/login', authUser);

// @Route GET api/users/profile
// @Desc Return users profile
// @Access private
router.route('/profile').get(protect, getUserProfile);

// @Route GET api/users/google
// @Desc Initial route for Google OAuth
// @Access public
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })
);

// @Route GET api/users/google/callback
// @Desc Callback route for an authenticated Google user
// @Access public
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  asyncHandler(async (req, res) => {
    // res.redirect('/dashboard');
    // console.log('callback', req.user);
    const { email } = req.user;
    // const user = await User.findOne({ email });

    const payload = {
      user: {
        email: req.user.email,
        id: req.user._id,
        name: req.user.name,
        role: req.user.role,
      },
    };

    // Create a token with user details
    // Create cookie and set expiration other one (for parent users) is in userControllers authUser
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1w',
      }
      // (err, token) => {
      //   console.log('signed token', token);
      //   res.json({
      //     token,
      //   });
      // }
    );
    // Set the cookie containing the jwt token
    res.cookie('jwt', token, {
      secure: true,
      httpOnly: true,
    });

    if (process.env.NODE_ENV === 'production') {
      // Production routes
      if (req.user.role === 'student') {
        res.redirect(`/student/${req.user._id}`);
      } else if (req.user.role === 'admin') {
        res.redirect(`/findstudent`);
      } else if (req.user.role === 'teacher') {
        res.redirect(`/findstudent`);
      } else {
        // Otherwise send to root
        res.redirect('/');
      }
    } else {
      // Development routes
      if (req.user.role === 'student') {
        res.redirect(`http://localhost:3000/student/${req.user._id}`);
      } else if (req.user.role === 'admin') {
        res.redirect(`http://localhost:3000/findstudent`);
      } else if (req.user.role === 'teacher') {
        res.redirect(`http://localhost:3000/findstudent`);
      } else {
        // Otherwise send to root
        res.redirect('http://localhost:3000/');
      }
    }
  })
);

// @Route GET api/users/logout
// @Desc User logout
// @Access public
router.get('/logout', (req, res) => {
  res.session = null;

  req.logout();
  res.clearCookie('jwt');
  res.redirect('/');
});

// @Route GET api/users/current-session
// @Desc Called on page update, check user and return user details
// @Access public
router.get(
  '/current-session',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // console.log('Current session jwt', req.cookies.jwt);
    console.log('Current session User', req.user);

    // Verify users jwt token
    const dec = jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        // If token is not valid
        // TODO ENSURE ONLY VALID VERIFY SENDS BACK
        if (err) {
          console.log('error', err);
        }
        let user;

        // decoded is user object
        const [username, domain] = decoded.user.email.split('@');

        // Domain check for parents or teacher/student
        if (domain === 'frieslandschool.com') {
          user = await User.findOne({ email: decoded.user.email });
        } else {
          user = await Parent.findOne({ email: decoded.user.email });
        }

        const { _id, email, role, name, reportData, children } = user;

        // Send back to frontend and redux
        res.json({
          _id,
          email,
          name,
          role,
          reportData,
          children,
        });
      }
    );
  }
);

module.exports = router;
