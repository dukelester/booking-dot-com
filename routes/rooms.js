/* eslint-disable import/extensions */
import express from 'express';
import {
  getAllRooms, createRoom, updateRoom, deleteRoom, findRoomById,
} from '../controllers/room.js';

import { verifyIsAdmin } from '../utils/verifytoken.js';

const router = express.Router();

// GET ALL
router.get('/', getAllRooms);

// GET Hotel by ID
router.get('/:roomId', findRoomById);

// CREATE
router.post('/:hotelId', verifyIsAdmin, createRoom);

// UPDATE
router.put('/:roomId', verifyIsAdmin, updateRoom);

// DELETE
router.delete('/:roomId/:hotelId', verifyIsAdmin, deleteRoom);

export default router;
