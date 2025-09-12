import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

// Helper function to generate JWT and send response
const generateTokenAndSend = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Authentication successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
};

// ================== REGISTER ==================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 3600000; // 1 hour

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await sendEmail(email, otp);

    res.status(201).json({
      message: "User created. OTP sent for verification",
      step: "verifyOtp",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// ================== LOGIN ==================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });

    // Generate OTP for login verification
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.otpExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendEmail(email, otp);

    res.status(200).json({
      message: "OTP sent for login verification",
      step: "verifyOtp",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ================== VERIFY OTP ==================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otp) {
      return res.status(400).json({ message: "No OTP found for this user" });
    }

    if (user.otp.toString() !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ just let the helper send the response
    return generateTokenAndSend(user, res);

  } catch (err) {
    console.error("❌ Backend verifyOtp error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



// ================== LOGOUT ==================
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

// ================== CHECK AUTH ==================
export const checkAuth = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.json({ loggedIn: false });

    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
};



// user info
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user info",
      error: err.message,
    });
  }
}