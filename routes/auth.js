/* eslint-disable import/extensions */
import express from 'express';
import { userLogin, userRegistration, verifyUserEmail } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', userLogin);
router.get('/confirm/:confirmationCode', verifyUserEmail);

export default router;
