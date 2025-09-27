const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 10;

async function hashPassword(plainTextPassword) {
  return bcrypt.hash(plainTextPassword, BCRYPT_ROUNDS);
}

async function verifyPassword(plainTextPassword, passwordHash) {
  return bcrypt.compare(plainTextPassword, passwordHash);
}

module.exports = { hashPassword, verifyPassword };



