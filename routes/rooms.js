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
router.post('/:hotelId', createRoom);

// UPDATE
router.put('/:roomId', updateRoom);

// DELETE
router.delete('/:roomId/:hotelId', deleteRoom);

export default router;
