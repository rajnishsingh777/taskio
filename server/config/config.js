const path = require('path');
const dotenv = require('dotenv');

function loadConfig() {
  dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

  const nodeEnv = process.env.NODE_ENV || 'development';
  const port = Number(process.env.PORT || 5000);
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/merntodo';
  const jwtSecret = process.env.JWT_SECRET || 'change-me';
  const corsOrigin = process.env.CORS_ORIGIN || '*';

  return { nodeEnv, port, mongoUri, jwtSecret, corsOrigin };
}

module.exports = { loadConfig };


