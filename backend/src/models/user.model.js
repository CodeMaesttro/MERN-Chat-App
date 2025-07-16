import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=User'
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  location: {
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    houseAddress: { type: String, default: "" }
  },
  relationshipStatus: {
    type: String,
    enum: ['Single', 'In a Relationship', 'Married', 'Divorced', 'Widowed', 'Other'],
    default: 'Single'
  },
  dateOfBirth: {
    type: Date
  }
}, {
  timestamps: true
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
