import mongoose from 'mongoose';

const { Schema } = mongoose;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'inactive'
    },
    emailVerified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },

);

export default mongoose.model('User', User);
