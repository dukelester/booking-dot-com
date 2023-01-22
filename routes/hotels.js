/* eslint-disable import/extensions */
import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// GET ALL
router.get('/', async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
});

// GET Hotel by ID
router.get('/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;
    const foundHotel = await Hotel.findById(hotelId);
    if (foundHotel) {
      res.status(200).json(foundHotel);
    } else {
      res.status(404).json({ message: ' Hotel with that Id not found!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put('/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $set: req.body }, { new: true });
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete('/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({ message: `Hotel with id ${hotelId} has been deleted successfully` });
  } catch (error) {
    req.status(500).json(error);
  }
});

export default router;
