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

describe('room', () => {
  describe('get the room route', () => {
    describe('Get the rooms data', () => {
        it('should return a 200 success status code', async () => {
          const response = await request(app).get('/api/rooms');
          expect(response.statusCode).toBe(200);
        });
    });
    describe('given the room Id get the room', () => {
      it('should return a 200 success', async () => {
        const roomId = '63cdb48006c9ea8c1207b5b2';
        const response = await request(app).get(`/api/rooms/${roomId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(roomId);
      });
    });
    describe('given a wrong room id ', () => {
      it('should return an error ', async () => {
        const roomId = '63cd00bf8fa7f46ff9er7cca';
        const response = await request(app).get(`/api/rooms/find/${roomId}`);
        expect(response.statusCode).toBe(404);
      });
    });
  });
  describe('updating a room imformation', () => {
    it('should return the updated room', async () => {
      const roomId = '63cdb4d306c9ea8c1207b5b5';
      const updatedRoom = await request(app).put(`/api/rooms/${roomId}/`)
        .send({
          "price": 5000,
        });
        expect(updatedRoom.statusCode).toBe(200);
        expect(updatedRoom.body.price).toStrictEqual(5000);
        expect(updatedRoom.body._id).toStrictEqual(roomId);
    });
  });
  describe('updating a room imformation', () => {
    it('should return an error if the room id is wrong', async () => {
      const roomId = '63cdb4d306c9ea1207b5b5';
      const updatedRoom = await request(app).put(`/api/rooms/${roomId}/`)
        .send({
          "price": 5000,
        });
        expect(updatedRoom.statusCode).toBe(500);
        expect(updatedRoom.body).toStrictEqual({});
    });
  });
  });

