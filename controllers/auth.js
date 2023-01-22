/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import User from '../models/User.js';
import { hashPassword, isPasswordCorrect } from '../utils/hashpassword.js';
import createError from '../utils/error.js';

export const userRegistration = async (req, res, next) => {
  try {
    const {
      username, email, phone, password,
    } = req.body;
    const newUser = new User({
      username, email, phone, password: hashPassword(password),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (!foundUser) return next(createError(404, 'User not found!'));
    if (!isPasswordCorrect(password, foundUser.password)) return next(createError(400, 'Wrong password or username'));
    const { password: userpassword, isAdmin, ...otherDetails } = foundUser._doc;
    res.status(200).json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
