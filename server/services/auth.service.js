const User = require('../models/User');
const { hashPassword, verifyPassword } = require('../utils/password');
const { signJwt } = require('../utils/jwt');

async function signup({ email, password, name }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error('Email already in use');
    error.status = 409;
    throw error;
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash, name });
  const token = signJwt({ userId: user._id.toString() });
  return { token, user: { id: user._id, email: user.email, name: user.name } };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  const token = signJwt({ userId: user._id.toString() });
  return { token, user: { id: user._id, email: user.email, name: user.name } };
}

module.exports = { signup, login };



