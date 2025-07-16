import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import generateJWT from "../utils/generateJWT.js";

// ✅ Signup controller
export const signUp = async (req, res) => {
  const {
    username,
    email,
    password,
    avatar,
    location,
    relationshipStatus,
    dateOfBirth
  } = req.body;

  try {
    // 1️⃣ Validate data
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // 2️⃣ Password length check
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // 3️⃣ Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 4️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // 5️⃣ Create and save new user
    const newUser = new userModel({
      username,
      email,
      password: hashPassword,
      avatar,
      location: {
        country: location?.country || "",
        city: location?.city || "",
        houseAddress: location?.houseAddress || ""
      },
      relationshipStatus: relationshipStatus || "Single",
      dateOfBirth: dateOfBirth || null
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        location: newUser.location,
        relationshipStatus: newUser.relationshipStatus,
        dateOfBirth: newUser.dateOfBirth
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// ✅ Signin controller
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Input validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // 2️⃣ Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 4️⃣ Update user online status
    user.isOnline = true;
    await user.save();

    // 5️⃣ Generate JWT & set cookie
    const token = generateJWT(user._id, res);

    // 6️⃣ Respond with user and token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isOnline: user.isOnline,
        location: user.location,
        relationshipStatus: user.relationshipStatus,
        dateOfBirth: user.dateOfBirth
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};

// ✅ Logout controller
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
