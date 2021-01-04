const bcrypt = require('bcryptjs');

const users = [
  { email: 'cbradbury@frieslandschool.com', name: 'C Bradbury', role: 'admin' },
  {
    email: 'tcrilly@frieslandschool.com',
    name: 'T Crilly',
    role: 'teacher',
  },

  // {
  //   email: '18astudent@frieslandschool.com',
  //   name: 'Another Student',
  //   intake: 18,
  //   role: 'student',
  //   reportData: [
  //     { year: 2020, datapoint: 1 },
  //     { year: 2020, datapoint: 2 },
  //   ],
  // },
  // {
  //   email: '17auser@frieslandschool.com',
  //   name: 'Another User',
  //   intake: 19,
  //   role: 'student',
  //   reportData: [
  //     { year: 2020, datapoint: 1 },
  //     { year: 2020, datapoint: 2 },
  //   ],
  // },
  // {
  //   email: '17nstudent@frieslandschool.com',
  //   name: 'New Student',
  //   intake: 17,
  //   role: 'student',
  //   reportData: [
  //     { year: 2020, datapoint: 1 },
  //     { year: 2020, datapoint: 2 },
  //   ],
  // },
  {
    email: '19tuser@frieslandschool.com',
    name: 'Test User',
    intake: 19,
    role: 'student',
    reportData: [],
  },

  // {
  //   name: 'Admin User',
  //   email: 'admin@example.com',
  //   password: bcrypt.hashSync('123456', 10),
  //   isAdmin: true,
  // },
  // {
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
  // {
  //   name: 'Jane Doe',
  //   email: 'jane@example.com',
  //   password: bcrypt.hashSync('123456', 10),
  // },
];

module.exports = users;
