const bcrypt = require('bcryptjs');

const parents = [
  {
    email: 'mrsuser@example.com',
    name: 'Mrs User',
    password: bcrypt.hashSync('123456', 10),
    children: ['19tuser@frieslandschool.com'],
  },
  {
    name: 'Mr Student',
    email: 'mrstudent@example.com',
    password: bcrypt.hashSync('123456', 10),
    children: [],
  },
];

module.exports = parents;
