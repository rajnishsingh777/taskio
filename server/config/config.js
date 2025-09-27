const path = require('path');
const dotenv = require('dotenv');

function loadConfig() {
  dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

  const nodeEnv = process.env.NODE_ENV || 'development';
  const port = Number(process.env.PORT || 5000);
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/merntodo';
  const jwtSecret = process.env.JWT_SECRET || 'change-me';
  
  // Allow multiple origins for CORS
  const corsOrigin = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:5173', 'https://taskio-1.onrender.com'];

  return { nodeEnv, port, mongoUri, jwtSecret, corsOrigin };
}

module.exports = { loadConfig };


