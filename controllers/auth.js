/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { hashPassword, isPasswordCorrect } from '../utils/hashpassword.js';
import createError from '../utils/error.js';

export const userRegistration = async (req, res, next) => {
  try {
    const {
      username, email, phone, password,
    } = req.body;
    if (username && email && phone && password) {
      const newUser = new User({
        username, email, phone, password: hashPassword(password),
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } else {
      res.status(400).json({ message: 'Bad information' });
    }
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser.status !== 'Active') return next(createError(401, 'Pending Account. Please Verify Your Email!'));
    if (!foundUser) return next(createError(404, 'User not found!'));
    if (!isPasswordCorrect(password, foundUser.password)) return next(createError(400, 'Wrong password or username'));
    const { password: userpassword, isAdmin, ...otherDetails } = foundUser._doc;
    const token = jwt.sign({
      id: foundUser._id,
      isAdmin: foundUser.isAdmin,
    }, process.env.JWT_SECRETE_KEY);

    res.cookie('access_token', token, { httpOnly: true }).status(200).json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
