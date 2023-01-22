/* eslint-disable import/extensions */
import express from 'express';
import {
  createUser, deleteUser, getAllUsers, getUserById, updateUserById,
} from '../controllers/user.js';
import verifyToken from '../utils/verifytoken.js';

const router = express.Router();

// Check for authentication
router.get('/checkauthentication', verifyToken, (req, res, next) => {
  res.send('hello user , you are authenticated');
});

// GET ALL
router.get('/', getAllUsers);

// GET User by ID
router.get('/:userId', getUserById);

// CREATE
router.post('/', createUser);

// UPDATE
router.put('/:userId', updateUserById);

// DELETE
router.delete('/:userId', deleteUser);

export default router;
