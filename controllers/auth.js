/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { hashPassword, isPasswordCorrect } from '../utils/hashpassword.js';
import createError from '../utils/error.js';
import sendConfirmationEmail from '../utils/send-email.js';

export const userRegistration = async (req, res, next) => {
  try {
    const {
      username, email, phone, password,
    } = req.body;
    const userToken = jwt.sign({ email }, process.env.JWT_SECRETE_KEY);
    if (username && email && phone && password) {
      const newUser = new User({
        username,
        email,
        phone,
        password: hashPassword(password),
        confirmationCode: userToken,
      });
      const savedUser = await newUser.save();
      sendConfirmationEmail(username, email, savedUser.confirmationCode);
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

export const verifyUserEmail = async (req, res, next) => {
  try {
    const { confirmationCode } = req.params;
    const toBeVerified = await User.findOne({ confirmationCode });
    if (!toBeVerified) return createError(404, 'This user cannot not be found');
    toBeVerified.status = 'Active';
    await toBeVerified.save();
    res.status(200).json({ message: 'Email verified successfully. You can now login' });
  } catch (error) {
    next(error);
  }
};
