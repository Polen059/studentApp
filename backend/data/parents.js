const bcrypt = require('bcryptjs');

const parents = [
  {
    email: 'mrsUser@example.com',
    name: 'Mrs User',
    password: bcrypt.hashSync('123456', 10),
    children: [],
  },
  {
    name: 'Mr Student',
    email: 'mrstudent@example.com',
    password: bcrypt.hashSync('123456', 10),
    children: [],
  },
];

module.exports = parents;
