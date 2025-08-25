import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../Context/AppContext"; // adjust path if needed

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useContext(AppContext);

  // state for inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle register function
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, formData.phone);
      navigate("/otp", {state : {email : email}}); // redirect after success
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-300/30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-red-300/30 blur-3xl animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 max-w-md w-full z-10"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            required
          />
         
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            required
          />

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:opacity-90 transition mb-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex justify-center mb-4 text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button
            className="text-red-600 hover:underline ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <img
            src="https://placehold.co/120x120"
            alt="Food Delivery"
            className="w-28 h-28"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
