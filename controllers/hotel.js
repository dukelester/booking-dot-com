/* eslint-disable import/extensions */
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

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
    } else if (!foundHotel) {
      res.status(404).json({ message: ' Hotel with that Id not found!' });
    }
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

export const getAllHotels = async (req, res, next) => {
  // const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find(req.query).limit(5);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(cities.map((city) => Hotel.countDocuments({ city })));
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartment', count: apartmentCount },
      { type: 'resort', count: resortCount },
      { type: 'villa', count: villaCount },
      { type: 'cabin', count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    const list = await Promise.all(hotel.rooms.map((room) => Room.findById(room)));
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
