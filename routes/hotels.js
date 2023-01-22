/* eslint-disable import/extensions */
import express from 'express';
import {
  createHotel, deleteHotel, getAllHotels, getHotelById, updateHotelById,
} from '../controllers/hotel.js';

const router = express.Router();

// GET ALL
router.get('/', getAllHotels);

// GET Hotel by ID
router.get('/:hotelId', getHotelById);

// CREATE
router.post('/', createHotel);

// UPDATE
router.put('/:hotelId', updateHotelById);

// DELETE
router.delete('/:hotelId', deleteHotel);

export default router;
