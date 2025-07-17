import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  country: String,
  city: String,
  houseAddress: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    default: '',
  },
  location: locationSchema,
  relationshipStatus: {
    type: String,
    enum: ['Single', 'In a relationship', 'Married', 'Divorced'],
    default: 'Single',
  },
  dateOfBirth: {
    type: Date,
  }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
