import { createContext, useState } from "react";
import axios from "axios";
import React from "react";

export const AdminContext = createContext();

const url = import.meta.env.VITE_API_URL;

export const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foods, setFoods] = useState([]);

  // 🔹 Add food
  const SaveFood = async (name, description, category, price, image, rating, discount) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${url}/savefood`,
        { name, description, category, price, image, rating, discount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ SaveFood API response:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ SaveFood error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to save food");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Get all food
  const GetFood = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${url}/getfood`);

      console.log("✅ GetFood API response:", response.data);
      setFoods(response.data.foods || []); // assuming backend returns { foods: [...] }

      return response.data;
    } catch (err) {
      console.error("❌ GetFood error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch food");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{ SaveFood, GetFood, foods, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};
