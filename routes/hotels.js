/* eslint-disable import/extensions */
import express from 'express';
import {
  countByCity, countByType,
  createHotel, deleteHotel, getAllHotels, getHotelById, updateHotelById,
} from '../controllers/hotel.js';
import { verifyIsAdmin } from '../utils/verifytoken.js';

const router = express.Router();

// GET ALL
router.get('/', getAllHotels);

// GET Hotel by ID
router.get('/:hotelId', getHotelById);

// CREATE
router.post('/', verifyIsAdmin, createHotel);

// UPDATE
router.put('/:hotelId', verifyIsAdmin, updateHotelById);

// DELETE
router.delete('/:hotelId', verifyIsAdmin, deleteHotel);
// GET Hotel by ID
router.get('/:hotelId', getHotelById);

// GET ALL
router.get('/', getAllHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

export default router;
