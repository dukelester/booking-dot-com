/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
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

const port = process.env.PORT;
app.listen(port, () => {
  connect();
  console.log(`server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('<h2> Welcome to our booking application</h2>');
});
