const { signupSchema, loginSchema } = require('../validators/auth.validator');
const { signup, login } = require('../services/auth.service');

async function handleSignup(req, res) {
  const { error, value } = signupSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
  try {
    const result = await signup(value);
    return res.status(201).json(result);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Internal server error' });
  }
}

async function handleLogin(req, res) {
  const { error, value } = loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) return res.status(400).json({ message: 'Validation failed', details: error.details });
  try {
    const result = await login(value);
    return res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Internal server error' });
  }
}

module.exports = { handleSignup, handleLogin };



