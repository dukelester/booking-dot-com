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

describe('Hotel', () => {
  describe('get the hotel route', () => {
    describe('Get the hotels data', () => {
        it('should return a 200 success status code', async () => {
          const response = await request(app).get('/api/hotels'); 
          expect(response.statusCode).toBe(200);
        });
    });
    describe('given the hotel Id get the hotel', () => {
      it('should return a 200 success', async () => {
        const hotelId = '63cd00bf8fa7f46ff9cc7cca';
        const response = await request(app).get(`/api/hotels/find/${hotelId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(hotelId);
      });
    });
    describe('given a wrong hotel id ', () => {
      it('should return an error ', async () => {
        const hotelId = '63cd00bf8fa7f46ff9er7cca';
        const response = await request(app).get(`/api/hotels/find/${hotelId}`);
        expect(response.statusCode).toBe(500);
      });
    });
    describe('given a city names Paris, Nairobi, Kiambu', () => {
      it('should return a count of a hotel in each city', async () => {
        const res = await request(app).get(`/api/hotels/countByCity?cities=Paris,Nairobi,Kiambu,Calfornia`);
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toBe(1);
        expect(res.body[1]).toBe(6);
        expect(res.body[2]).toBe(1);
        expect(res.body[3]).toBe(1);
        expect(res.body.length).toBe(4);
      });
      it('should return zero for a city without a hotel', async () => {
        const res = await request(app).get(`/api/hotels/countByCity?cities=Mombasa`);
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toBe(0);
      });
    });
  });
  describe('finding the propeties by type', () => {
    it('should return a total counts based on the type', async () => {
      const res = await request(app).get('/api/hotels/countByType');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(1);
      expect(res.body[0].type).toBe('hotel');
    });

  });
  describe('get the hotel rooms', () => {
    it('should return the rooms in a specified hotel given the hotel Id', async () => {
      const hotelId = ''
    });
    
  });
  
})
