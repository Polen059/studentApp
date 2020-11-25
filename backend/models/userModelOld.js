const mongoose = require('mongoose');

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
  reportData: [
    {
      _id: false,
      reportDate: {
        type: Date,
      },
      year: {
        type: Number,
      },
      dataPoint: {
        type: Number,
      },
      data: [
        {
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
        },
      ],
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
