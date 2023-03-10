/* eslint-disable import/extensions */
import express from 'express';
import {
  countByCity, countByType,
  createHotel, deleteHotel, getAllHotels, getHotelById, getHotelRooms, updateHotelById,
} from '../controllers/hotel.js';
import { verifyIsAdmin } from '../utils/verifytoken.js';

const router = express.Router();

// GET Hotel by ID
router.get('/find/:hotelId', getHotelById);

// CREATE
router.post('/', createHotel);

// UPDATE
router.put('/:hotelId', updateHotelById);

// DELETE
router.delete('/:hotelId', deleteHotel);

// GET ALL
router.get('/', getAllHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room:/hotelId', getHotelRooms);

export default router;
