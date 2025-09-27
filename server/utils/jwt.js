const jwt = require('jsonwebtoken');
const { loadConfig } = require('../config/config');

const { jwtSecret } = loadConfig();

function signJwt(payload, options = {}) {
  return jwt.sign(payload, jwtSecret, { expiresIn: '7d', ...options });
}

function verifyJwt(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = { signJwt, verifyJwt };



