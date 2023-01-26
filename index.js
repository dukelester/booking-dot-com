/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import createServer from './utils/server.js';

const app =createServer();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('The database has been connected successfully');
  } catch (error) {
    throw new Error(error);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('Mongo db disconnected!');
});

mongoose.connection.on('connected', () => {
  console.log('Mongo db disconnected!');
});

// middlewares
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

// error handling middleware

app.use((err, req, res, next) => {
  const errorSatatus = err.status || 500;
  const errorMessage = err.message || 'Something went bad !';
  return res.status(errorSatatus).json({
    success: false,
    status: errorSatatus,
    message: errorMessage,
    stack: errorSatatus.stack,
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  connect();
  console.log(`server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('<h2> Welcome to our booking application</h2>');
});
