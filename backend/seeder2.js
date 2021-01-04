const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const users = require('./data/parents');
const User = require('./models/userModel2');
const connectDB = require('./config/db');

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    console.log('created users');
    console.log(createdUsers);

    const adminUser = createdUsers[0]._id;

    const studentUser = await User.findOne({
      email: '19tuser@frieslandschool.com',
    });

    console.log(studentUser);

    await studentUser.reportData.addToSet({
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
      ],
    });

    await studentUser.reportData.addToSet({
      year: 2020,
      datapoint: 2,
      data: [
        {
          subjectName: 'Maths',
          effort: 5,
          subjectGrade: 7,
        },
        {
          subjectName: 'English',
          effort: 3,
          subjectGrade: 5,
        },
      ],
    });

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

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
