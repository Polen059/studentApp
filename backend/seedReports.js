const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const User = require('./models/user');
const connectDB = require('./config/db');

connectDB();
// This stops a deprecation warning appearing
mongoose.set('useFindAndModify', false);

const importReport = async () => {
  try {
    // findOneAndUpdate
    // 1 Query object
    // 2 data object
    // 3 Options object
    await User.findOneAndUpdate(
      {
        email: '19tuser@frieslandschool.com',
      },
      {
        $push: {
          reportData: {
            year: 2020,
            datapoint: 1,
            data: [
              {
                subjectName: 'Maths',
                effort: 5,
                subjectGrade: 6,
              },
              {
                subjectName: 'English',
                effort: 4,
                subjectGrade: 6,
              },
              {
                subjectName: 'Science',
                effort: 5,
                subjectGrade: 4,
              },
              {
                subjectName: 'History',
                effort: 3,
                subjectGrade: 4,
              },
              {
                subjectName: 'Geography',
                effort: 4,
                subjectGrade: 6,
              },
              {
                subjectName: 'French',
                effort: 2,
                subjectGrade: 5,
              },
              {
                subjectName: 'Computer Science',
                effort: 5,
                subjectGrade: 8,
              },
              {
                subjectName: 'Physical Education',
                effort: 3,
                subjectGrade: 4,
              },
            ],
          },
        },
      }
    );

    await User.findOneAndUpdate(
      {
        email: '19tuser@frieslandschool.com',
      },
      {
        $push: {
          reportData: {
            year: 2020,
            datapoint: 2,
            data: [
              {
                subjectName: 'Maths',
                effort: 4,
                subjectGrade: 5,
              },
              {
                subjectName: 'English',
                effort: 4,
                subjectGrade: 6,
              },
              {
                subjectName: 'Science',
                effort: 4,
                subjectGrade: 6,
              },
              {
                subjectName: 'History',
                effort: 3,
                subjectGrade: 4,
              },
              {
                subjectName: 'Geography',
                effort: 4,
                subjectGrade: 5,
              },
              {
                subjectName: 'French',
                effort: 2,
                subjectGrade: 3,
              },
              {
                subjectName: 'Computer Science',
                effort: 5,
                subjectGrade: 6,
              },
              {
                subjectName: 'Physical Education',
                effort: 4,
                subjectGrade: 6,
              },
            ],
          },
        },
      },
      {
        timestamps: true,
      }
    );

    await User.findOneAndUpdate(
      {
        email: '19tuser@frieslandschool.com',
      },
      {
        $push: {
          reportData: {
            year: 2020,
            datapoint: 3,
            data: [
              {
                subjectName: 'Maths',
                effort: 3,
                subjectGrade: 3,
              },
              {
                subjectName: 'English',
                effort: 4,
                subjectGrade: 5,
              },
              {
                subjectName: 'Science',
                effort: 5,
                subjectGrade: 7,
              },
              {
                subjectName: 'History',
                effort: 3,
                subjectGrade: 5,
              },
              {
                subjectName: 'Geography',
                effort: 4,
                subjectGrade: 6,
              },
              {
                subjectName: 'French',
                effort: 3,
                subjectGrade: 4,
              },
              {
                subjectName: 'Computer Science',
                effort: 5,
                subjectGrade: 8,
              },
              {
                subjectName: 'Physical Education',
                effort: 2,
                subjectGrade: 4,
              },
            ],
          },
        },
      },
      {
        timestamps: true,
      }
    );

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importReport();
