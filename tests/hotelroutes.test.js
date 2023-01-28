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
        expect(res.body[1]).toBe(5);
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
      expect(res.body[0].type).toStrictEqual('hotel');
    });

  });
  describe('create hotel', () => {
    it('create a hotel and save to the database', async () => {
      const newHotel = await request(app).post('/api/hotels').send({
          "name": "Master class Hotel",
          "type": "hotel",
          "city": "Kiambu",
          "address": "Thika, 8765672",
          "distance": "23 Km",
          "photos": [],
          "description": "Best hotel in the Juja sub county",
          "rooms": [],
          "cheapestPrice": 1000,
          "rating":3.8
      });
      expect(newHotel.body.type).toStrictEqual('hotel');
      expect(newHotel.statusCode).toBe(201);
    });
  });
  describe('updating a hotel imformation', () => {
    it('should return the updated hotel', async () => {
      const hotelId = '63cd00bf8fa7f46ff9cc7cca';
      const updatedHotel = await request(app).put(`/api/hotels/${hotelId}/`)
        .send({
          "name": "Master King Hotel",
        });
        expect(updatedHotel.statusCode).toBe(200);
        expect(updatedHotel.body.name).toStrictEqual('Master King Hotel');
        expect(updatedHotel.body._id).toStrictEqual(hotelId);
    });
  });
  describe('updating a hotel imformation', () => {
    it('should return an error if the hotel id is wrong', async () => {
      const hotelId = '63cd00bf8fa7f4f9cc7cca';
      const updatedHotel = await request(app).put(`/api/hotels/${hotelId}/`)
        .send({
          "name": "Master King Hotel",
        });
        expect(updatedHotel.statusCode).toBe(500);
        expect(updatedHotel.body).toStrictEqual({});
    });
  });
  describe('deleting a hotel imformation', () => {
    it('should return an error if the hotel id is wrong', async () => {
      const hotelId = '63cd00bf8fa7f4f9cc7cca';
      const deletedHotel = await request(app).delete(`/api/hotels/${hotelId}/`);
        expect(deletedHotel.statusCode).toBe(500);
        expect(deletedHotel.body).toStrictEqual({});
    });
  });
  describe('deleting a hotel imformation', () => {
    it('should return 200 status ok if the hotel is successfuly deleted', async () => {
      const hotelId = '63cd00ea8fa7f46ff9cc7ccc';
      const deletedHotel = await request(app).delete(`/api/hotels/${hotelId}/`);
        expect(deletedHotel.statusCode).toBe(200);
        expect(deletedHotel.body.message).toStrictEqual(`Hotel with id ${hotelId} has been deleted successfully`);
    });
  });
})
