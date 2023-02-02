/* eslint-disable import/extensions */
import express from 'express';
import {
  createUser, deleteUser, getAllUsers, getUserById, updateUserById,
} from '../controllers/user.js';
import { verifyUser } from '../utils/verifytoken.js';

const router = express.Router();

// Check for authentication
// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.send('hello user , you are authenticated');
// });

// router.get('/checkuser/:userId', verifyUser, (req, res, next) => {
//   res.send('hello user , you are logged in');
// });

// router.get('/admin/:userId', verifyIsAdmin, (req, res, next) => {
//   res.send('hello Admin , you are logged in and you have super control');
// });

// GET ALL
router.get('/', getAllUsers);

// GET User by ID
router.get('/:userId', getUserById);

// CREATE
router.post('/', verifyUser, createUser);

// UPDATE
router.put('/:userId', verifyUser, updateUserById);

// DELETE
router.delete('/:userId', deleteUser);

export default router;
