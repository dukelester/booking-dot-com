/* eslint-disable import/extensions */
import express from 'express';
import { userRegistration } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', userRegistration);

export default router;
