const express = require('express');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const parentRoutes = require('./routes/parentRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const mongoose = require('mongoose');
const passportSetup = require('./config/passport-setup');
const colors = require('colors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

connectDB();

const app = express();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

__dirname = path.resolve();

console.log('dir', __dirname);

// When ready for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Api is running');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
