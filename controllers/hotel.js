/* eslint-disable import/extensions */
import Hotel from '../models/Hotel.js';

// The hotel controllers
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    const foundHotel = await Hotel.findById(hotelId);
    if (foundHotel) {
      res.status(200).json(foundHotel);
    } else {
      res.status(404).json({ message: ' Hotel with that Id not found!' });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const updateHotelById = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $set: req.body }, { new: true });
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({ message: `Hotel with id ${hotelId} has been deleted successfully` });
  } catch (error) {
    next(error);
  }
};
