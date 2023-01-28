import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import request from 'supertest'
import createServer from '../utils/server.js';


dotenv.config();

const app = createServer();

beforeEach( async () => {
  await mongoose.connect(process.env.MONGO);
});

afterEach( async () => {
  await mongoose.connection.close()
});

describe('users', () => {
  describe('get all users from the database', () => {
    it('should return all the users from the database', async () => {
        const users = await request(app).get('/api/users');
        expect(users.statusCode).toBe(200);
        expect(users.body.length).toBeGreaterThan(1);
    });
  });

  describe('get specific user', () => {
    it('should return a user based on the user ID', async () => {
        const userId = '63cd13e65ab1665b42812b61';
        const user = await request(app).get(`/api/users/${userId}`);
        expect(user.statusCode).toBe(200);
        expect(user.body._id).toBe(userId);
        console.log(user.body._id)
    });
  });

})

