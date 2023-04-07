const jwt = require('jsonwebtoken');

const payload = {
  userId: 1234,
};

const secret = 'mysecret';

const token = jwt.sign(payload, secret);

console.log(token);