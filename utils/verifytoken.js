import jwt from 'jsonwebtoken';

import createError from './error.js';

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }
  jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, user) => {
    if (err) {
      return next(createError(401, 'Invalid token!'));
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
