import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import generateJWT from "../utils/generateJWT.js";

// Sign Up function
export const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      avatar,
      location,
      relationshipStatus,
      dateOfBirth
    } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      avatar,
      location,
      relationshipStatus,
      dateOfBirth
    });

    const savedUser = await newUser.save(); // ✅ Now we define `savedUser`

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        avatar: savedUser.avatar,
        location: savedUser.location,
        relationshipStatus: savedUser.relationshipStatus,
        dateOfBirth: savedUser.dateOfBirth
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Sign In function
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    user.isOnline = true;
    await user.save();

    const token = generateJWT(user._id, res);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isOnline: user.isOnline,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};

// Sign Out
export const signOut = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.user._id, { isOnline: false });

    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
      error: error.message,
    });
  }
};

// Get Authenticated User Info
export const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isOnline: user.isOnline,
        bio: user.bio,
        location: user.location,
        relationshipStatus: user.relationshipStatus,
        dateOfBirth: user.dateOfBirth,
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user information',
      error: error.message
    });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  const {
    username,
    email,
    avatar,
    country,
    city,
    houseAddress,
    bio,
    relationshipStatus,
    dateOfBirth
  } = req.body;

  try {
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (avatar) updateData.avatar = avatar;

    // Location (nested object)
    if (country || city || houseAddress) {
      updateData.location = {};
      if (country) updateData.location.country = country;
      if (city) updateData.location.city = city;
      if (houseAddress) updateData.location.houseAddress = houseAddress;
    }

    if (relationshipStatus) updateData.relationshipStatus = relationshipStatus;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (bio) updateData.bio = bio;

    const existingUser = await userModel.findOne({
      _id: { $ne: req.user._id },
      $or: [
        username ? { username } : {},
        email ? { email } : {}
      ].filter(Boolean)
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    res.status(500).json({ message: 'Profile update failed', error: error.message });
  }
};
