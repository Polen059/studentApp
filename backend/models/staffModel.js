import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      // Other role is admin
      default: 'teacher',
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model('staff', staffSchema);

module.exports = Staff;
