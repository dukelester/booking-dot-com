/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const RoomsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
}, { timestamps: true });

export default mongoose.model('Room', RoomsSchema);
