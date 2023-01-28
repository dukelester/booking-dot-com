// Testing the auth
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


describe('user authentication', () => {
  describe('test user register', () => {
    it('should return an error if the user body is not given', async () => {
        const user = await request(app).post('/api/auth/register');
        expect(user.statusCode).toBe(400);
        expect(user.body.message).toStrictEqual('Bad information');
    });
  });
  describe('test user register', () => {
    it('should return 201 success status message if the body is correct', async () => {
      const user = await request(app).post('/api/auth/register')
        .send({
            "username": "lesterdu978",
            "email": "lesterdpe0p@gmail.com",
            "phone": "07678096905",
            "password": "duke2030"
        });
      expect(user.statusCode).toBe(201);
      expect(user.body.username).toStrictEqual('lesterdu978');
      expect(user.body.email).toStrictEqual('email');
      expect(user.body.phone).toStrictEqual('phone');
    });
  });
  describe('user login', () => {
    it('should return error for a wrong username and password', async () => {
        const loggedInUser = await request(app).post('/api/auth/login');
        expect(loggedInUser.statusType).toBe(404);
        expect(loggedInUser.body.message).toStrictEqual('User not found!')
    });
    it('should return success 200 for correct credentials', async () => {
        const loggedInUser = await request(app).post('/api/auth/login')
          .send({
                "username": "lesterdu978",
                "password": "duke2030"
          });
        expect(loggedInUser.statusType).toBe(200);
        expect(user.body.username).toStrictEqual('lesterdu978');
    });
  });

});
