import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user , verifyOtp } = useContext(AppContext);

  // Get email from location.state or localStorage
  const [email, setEmail] = useState(
    location.state?.email || localStorage.getItem('otpEmail') || ''
  );

  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Save email to localStorage if coming from previous page
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      localStorage.setItem('otpEmail', location.state.email);
    }
  }, [location.state?.email]);

  // Redirect to login if email is missing
  useEffect(() => {
    if (!email) {
      console.log(location)
      navigate('/login');
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      setMessage('');
      const otpCode = otp.join('');

      if (otpCode.length < 6) {
        setMessage('Please enter the full 6-digit OTP');
        setLoading(false);
        return;
      }

      const response = await verifyOtp(email, otpCode);
      setMessage(`✅ ${response.message || 'OTP Verified Successfully'}`);
      
      localStorage.removeItem('otpEmail'); // Clean up email

      // Redirect to profile after success
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Invalid OTP'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      setMessage('');
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/otp/resend`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMessage(`🔄 ${data.message || 'OTP resent successfully'}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Error resending OTP'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-200 via-orange-200 to-yellow-200 relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-red-300/30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-yellow-300/30 blur-3xl animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 max-w-md w-full z-10 flex flex-col items-center"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Verify Your OTP
        </h2>

        <div className="flex justify-between w-full mb-6 gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              className="w-12 h-12 text-center border border-gray-300 rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:opacity-90 transition mb-4"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        <div className="flex justify-center text-sm text-gray-600 mb-4">
          Didn't receive the OTP?
          <button
            onClick={handleResend}
            className="text-red-600 hover:underline ml-1"
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>

        {message && <p className="text-center text-sm text-gray-700 mb-4">{message}</p>}

        <div className="flex justify-center mt-4">
          <img
            src="https://placehold.co/120x120"
            alt="Food Icons"
            className="w-28 h-28"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Otp;
