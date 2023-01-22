/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

// create a room
export const createRoom = async (req, res, next) => {
  const { hotelId } = req.params;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    } catch (error) {
      next(error);
    }
    res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

// update a room
export const updateRoom = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, { $set: req.body }, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

// delete a room
export const deleteRoom = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ message: ` Room with the Id ${roomId} has been deleted Successfully!` });
  } catch (error) {
    next(error);
  }
};

// get all rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (error) {
    next(error);
  }
};

// get room by Id
export const findRoomById = async (req, res, next) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};
