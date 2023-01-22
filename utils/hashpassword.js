/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export const isPasswordCorrect = (password, userPass) => bcrypt.compareSync(password, userPass);
// export default hashPassword;
