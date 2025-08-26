// utils/generateToken.js
import jwt from "jsonwebtoken";

export const generateTokenAndSend = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // adjustable
  });

  // Send as cookie (optional, for more security)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Send as JSON (frontend can store in localStorage if you want)
  return res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
