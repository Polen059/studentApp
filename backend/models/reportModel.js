import mongoose from 'mongoose';

const subjectReportSchema = mongoose.Schema({
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
    data: [subjectReportSchema],
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('report', reportSchema);

export default Report;
