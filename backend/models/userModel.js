import mongoose from 'mongoose';

const subjectReportSchema = mongoose.Schema({
  report: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  subjectName: {
    type: String,
  },
  subjectGrade: {
    type: String,
  },
  targetGrade: {
    type: String,
  },
  effort: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    reportDate: {
      type: Date,
    },
    year: {
      type: Number,
    },
    dataPoint: {
      type: Number,
    },
    data: { subjectReportSchema },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model('user', UserSchema);

export default User;
