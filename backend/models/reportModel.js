const mongoose = require('mongoose');
const Subject = require('./subjectModel');

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
    // data: [Subject],
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('report', reportSchema);

module.exports = Report;
// export default Report;
