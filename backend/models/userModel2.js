import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Report = require('./reportModel');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
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
    // reportData: [Report],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
// export default User;
