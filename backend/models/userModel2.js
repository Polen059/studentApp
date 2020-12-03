import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
  reportData: [],
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;
