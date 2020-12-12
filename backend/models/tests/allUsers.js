const mongoose = require('mongoose');

const subjectReportSchema = mongoose.Schema(
  {
    subjectName: {
      type: String,
    },
    progress: {
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
    //   report: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Report',
    //     required: true,
    //   },
  },
  { timestamps: true }
);

const reportSchema = mongoose.Schema(
  {
    //   user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',
    //   },
    reportDate: {
      type: Date,
    },
    year: {
      type: Number,
    },
    dataPoint: {
      type: Number,
    },
    data: [subjectReportSchema],
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.Schema({
  role: {
    type: String,
    default: 'teacher',
  },
});

const Parent = mongoose.Schema({
  password: {
    type: String,
    // required: true,
  },
  // children = []
});

const Student = mongoose.Schema({
  intake: {
    type: Number,
  },
  reports: [reportSchema],
});

const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  _teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  _parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
  },
  _student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
});

const User = mongoose.model('User', userSchema);
// const Teacher = mongoose.model('Teacher', Teacher);

module.exports = User;
module.exports = Teacher;
