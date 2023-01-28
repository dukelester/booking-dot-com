import { hashPassword } from '../utils/hashpassword.js';

describe('password hashing', () => {
    describe('returns a hashed password', () => {
      it('should return a hashed password of length 60 caharacters', () => {
        expect(hashPassword('duke2030').length).toBe(60);
      });
    })

});
