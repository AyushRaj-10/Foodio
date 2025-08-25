import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const url = import.meta.env.VITE_API_URL; 

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 LOGIN
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(
        `${url}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setUser(data.user);
      console.log("✅ Login successful:", data.message || "Logged in!");
      console.log(data)
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Login failed";
      setError(msg);
      console.error(msg, err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 REGISTER
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(
        `${url}/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setUser(data.user);
      console.log("✅ Registration successful:", data.message || "Account created!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Registration failed";
      setError(msg);
      console.error(msg, err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP VERIFY
  const verifyOtp = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(
        `${url}/verify-otp`,
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      console.log(data)

      setUser(data.user);
      console.log("✅ OTP verification successful:", data.message || "User verified!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ OTP verification failed";
      setError(msg);
      console.error(msg, err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOGOUT
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const { data } = await axios.post(
        `${url}/logout`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
  
      setUser(null); // ✅ clear user
      localStorage.removeItem("token"); // ✅ clear token
  
      console.log("✅ Logout successful:", data.message);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Logout failed";
      setError(msg);
      console.error(msg, err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 SAVE ADDRESS - Fixed function name and implementation
  const saveAddress = async (addressData) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const { data } = await axios.post(
        `${url}/addresses`,
        addressData, // Send the entire address object
        { 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Add auth header
          } 
        }
      );

      // Update user with new address if returned
      if (data.user) {
        setUser(data.user);
      }

      console.log("✅ Address saved successfully:", data.message || "Address added!");
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Failed to save address";
      setError(msg);
      console.error(msg, err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CHECK AUTH
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${url}/check`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setUser(null);
          localStorage.removeItem("token"); // Clean up invalid token
        }
        console.log(data)
      } catch (err) {
        setUser(null);
        localStorage.removeItem("token"); // Clean up on error
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AppContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      verifyOtp, 
      logout, 
      saveAddress // Export the fixed function name
    }}>
      {children}
    </AppContext.Provider>
  );
};