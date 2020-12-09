const bcrypt = require('bcryptjs');

const users = [
  {
    forename: 'Mrs',
    surname: 'User',
    email: 'mrsUser@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: parent,
  },
];

module.exports = users;
