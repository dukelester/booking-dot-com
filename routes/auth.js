/* eslint-disable import/extensions */
import express from 'express';
import { userLogin, userRegistration } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', userLogin);

export default router;
