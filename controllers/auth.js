/* eslint-disable import/extensions */
import User from '../models/User.js';
import hashPassword from '../utils/hashpassword.js';

export const userRegistration = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;
    const newUser = new User({
      username, email, phone, password: hashPassword(password),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const userLogin = async () => {

};
