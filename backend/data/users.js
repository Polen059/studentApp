const bcrypt = require('bcryptjs');

const users = [
  { email: 'cbradbury@frieslandschool.com', name: 'C Bradbury', role: 'admin' },
  {
    email: 'tcrilly@frieslandschool.com',
    name: 'T Crilly',
    role: 'teacher',
  },
  {
    email: '19tuser@frieslandschool.com',
    name: 'T User',
    intake: 19,
    role: 'student',
    reportData: [
      { year: 2020, datapoint: 1 },
      { year: 2020, datapoint: 2 },
    ],
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
