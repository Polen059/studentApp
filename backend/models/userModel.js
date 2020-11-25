import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
  },
  displayName: {
    type: String,
  },
  forename: {
    type: String,
  },
  surname: {
    type: String,
  },
  intake: {
    type: Number,
  },
  role: {
    type: String,
  },
  reportData: { reportSchema },
});

const User = mongoose.model('user', userSchema);

export default User;
