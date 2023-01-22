import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(15);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

export default hashPassword;
