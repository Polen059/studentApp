import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import cors from 'cors';
import passport from 'passport';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api is running');
});

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
