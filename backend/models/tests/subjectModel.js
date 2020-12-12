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
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report',
      required: true,
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model('Subject', subjectReportSchema);

module.exports = Subject;
