const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { loadConfig } = require('./config/config');
const { connectToDatabase } = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/tasks.routes');

const config = loadConfig();

const app = express();

app.use(helmet());
  app.use(cors({ 
    origin: process.env.CORS_ORIGIN || 'https://taskio-1.onrender.com',
    credentials: true 
  }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  return res.status(200).json({ status: 'ok', env: config.nodeEnv });
});

app.get('/', (_req, res) => {
  return res.status(200).send('MERN TODO API is running');
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

async function start() {
  await connectToDatabase(config.mongoUri);
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${config.port}`);
  });
}

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', error);
  process.exit(1);
});


