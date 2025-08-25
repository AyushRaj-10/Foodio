import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../Context/AppContext"; 

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useContext(AppContext); // from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      console.log("Logged in user:", res);
      navigate("/otp", {state : {email : email}}); // redirect after login
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-red-300/30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-yellow-300/30 blur-3xl animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 max-w-md w-full z-10"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Login to <span className="text-red-600">Foodio</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:opacity-90 transition mb-4 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-center text-sm text-red-600 mb-4">{error}</p>
        )}

        <div className="flex justify-between mb-4 text-sm">
          <button
            type="button"
            className="text-red-600 hover:underline"
            onClick={() => navigate("/otp")}
          >
            Forgot Password?
          </button>
          <button
            type="button"
            className="text-red-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>

        <div className="flex items-center justify-center mb-4">
          <span className="border-b border-gray-300 w-1/3"></span>
          <span className="mx-2 text-gray-500">or</span>
          <span className="border-b border-gray-300 w-1/3"></span>
        </div>

        <div className="flex justify-around">
          <button
            type="button"
            className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition duration-200"
          >
            Google
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition duration-200"
          >
            Facebook
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
