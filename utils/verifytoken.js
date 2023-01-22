/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';

import createError from './error.js';

export const verifyToken = (req, res, next) => {
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

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, ' You are not authorized'));
    }
  });
};

export const verifyIsAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, ' You are not admin'));
    }
  });
};
