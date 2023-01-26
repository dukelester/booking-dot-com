
import supertest from "supertest";
import createServer from '../utils/server.js';
const app = createServer();
describe('Hotel', () => {
  describe('get the hotel route', () => {
    describe('given the hotel does not exist', () => {
      it('should return a 404 error', async () => {
        const hotelId = '34567890ertyuio';
        await supertest(app).get(`/hotels/find/${hotelId}`).expect(404);
      });
      
    })
  });
})
