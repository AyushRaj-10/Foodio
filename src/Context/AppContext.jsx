import { createContext, useState , useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const url = import.meta.env.VITE_API_URL;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addresses, setAddresses] = useState([]);

  // 🔹 Helper: store token
  const storeToken = (newToken) => {
    console.log("🔹 storeToken called with:", newToken);
    setToken(newToken);
    if (newToken) {
      console.log("💾 Saving token to localStorage");
      localStorage.setItem("token", newToken);
    } else {
      console.log("🗑 Removing token from localStorage");
      localStorage.removeItem("token");
    }
  };

  // 🔹 LOGIN
  const login = async (email, password) => {
    console.log("➡️ login() called with email:", email);
    try {
      setLoading(true);
      setError(null);

      const data  = await axios.post(`${url}/login`, { email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      console.log("✅ Login API response:", data);

      if (data.user) {
        console.log("📌 Setting user from login response:", data.user);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.log("⚠️ No user in login response, likely OTP step");
        setUser({ email });
      }

      return data; // data.step === 'verifyOtp'
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Login failed";
      setError(msg);
      console.error("❌ Login error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
      console.log("⏹ login() finished");
    }
  };

  // 🔹 REGISTER
  const register = async (name, email, password) => {
    console.log("➡️ register() called with:", { name, email });
    try {
      setLoading(true);
      setError(null);

      const data  = await axios.post(`${url}/register`, { name, email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      console.log("✅ Register API response:", data);

      if (data.user) {
        console.log("📌 Setting user from register response:", data.user);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Registration failed";
      setError(msg);
      console.error("❌ Register error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
      console.log("⏹ register() finished");
    }
  };

  // 🔹 INITIALIZE ON MOUNT
  useEffect(() => {
    console.log("⏳ AppProvider mounted, checking localStorage...");
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      console.log("📦 Found user in localStorage:", storedUser);
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      console.log("📦 Found token in localStorage:", storedToken);
      setToken(storedToken);
      verifyAuth();
    } else {
      console.log("⚠️ No token found in localStorage");
    }
  }, []);

  // 🔹 OTP VERIFY
  const verifyOtp = async (email, otp) => {
    console.log("➡️ verifyOtp() called with:", { email, otp });
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.post(`${url}/verify-otp`, { email, otp }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
  
      console.log("✅ verifyOtp API response:", response.data);
  
      if (response.data.token) {
        console.log("📌 Storing token from OTP verification:", response.data.token);
        storeToken(response.data.token);
      }
  
      if (response.data.user) {
        console.log("📌 Setting user from OTP verification:", response.data.user);
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
  
      // ✅ return only the body
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.message || "OTP verification failed";
      setError(msg);
      console.error("❌ verifyOtp error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
      console.log("⏹ verifyOtp() finished");
    }
  };
  

  // 🔹 LOGOUT
  const logout = async () => {
    console.log("➡️ logout() called");
    try {
      setLoading(true);
      setError(null);

      const data  = await axios.post(`${url}/logout`);
      console.log("✅ Logout API response:", data);

      setUser(null);
      storeToken(null);
      localStorage.removeItem("user");

      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Logout failed";
      setError(msg);
      console.error("❌ Logout error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
      console.log("⏹ logout() finished");
    }
  };

  // 🔹 SAVE ADDRESS
const saveAddress = async (addressData) => {
  console.log("➡️ saveAddress() called with:", addressData);
  try {
    setLoading(true);
    setError(null);

    if (!token) {
      console.warn("⚠️ Cannot save address: no token");
      throw new Error("No authentication token found");
    }

    console.log("📦 Current token:", token);

    const  data  = await axios.post(
      `${url}/addresses`,
      addressData, // ✅ pass the whole form data object
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );

    console.log("✅ Save address API response:", data);

    return data;
  } catch (err) {
    const msg = err.response?.data?.message || "❌ Failed to save address";
    setError(msg);
    console.error("❌ saveAddress error:", err.response?.data || err.message);
    throw err;
  } finally {
    setLoading(false);
    console.log("⏹ saveAddress() finished");
  }
};


  // 🔹 MANUAL VERIFY AUTH
  const verifyAuth = async () => {
    console.log("🔄 verifyAuth() called");
    try {
      if (!token) {
        console.warn("⚠️ No token found for auth check");
        setUser(null);
        return { loggedIn: false };
      }

      const data  = await axios.get(`${url}/check`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ verifyAuth API response:", data);

      if (data.loggedIn) {
        console.log("📌 User is authenticated:", data.user);
        setUser(data.user);
      } else {
        console.warn("⚠️ User not logged in");
        setUser(null);
        storeToken(null);
      }

      return data;
    } catch (err) {
      console.error("❌ verifyAuth error:", err.response?.data || err.message);
      setUser(null);
      storeToken(null);
      return { loggedIn: false };
    }
  };

  // user info
  const userInfo = async () => {
    console.log("➡️ userInfo() called");
    try {
      setLoading(true);
      setError(null);
  
      if (!token) {
        console.warn("⚠️ Cannot fetch user info: no token");
        throw new Error("No authentication token found");
      }
  
      console.log("📦 Current token:", token);
  
      const  data  = await axios.get(`${url}/getme`, {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("✅ userInfo API response:", data);
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Failed to fetch user info";
      setError(msg);
      console.error("❌ userInfo error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
      console.log("⏹ userInfo() finished");
    }
  };


  // address Info
  const addressInfo = async () => {
    console.log("➡️ addressInfo() called");
    try {
      setLoading(true);
      setError(null);
  
      if (!token) {
        console.warn("⚠️ Cannot fetch addresses: no token");
        throw new Error("No authentication token found");
      }
  
      console.log("📦 Current token:", token);
  
      const response = await axios.get(`${url}/addresses`, {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("✅ addressInfo API response:", response.data);
  
      if (response.data) {
        setAddresses(response.data); // save the array directly
      }
  
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Failed to fetch addresses";
      setError(msg);
      console.error("❌ addressInfo error:", err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
      console.log("⏹ addressInfo() finished");
    }
  };
  
  
  


  return (
    <AppContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        addresses,
        login,
        register,
        verifyOtp,
        logout,
        saveAddress,
        verifyAuth,
        userInfo,
        addressInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
