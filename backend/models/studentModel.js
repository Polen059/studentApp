import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
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
    intake: {
      type: Number,
    },
    role: {
      type: String,
      default: 'student',
    },
    // Parent vs Child relationship?
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
