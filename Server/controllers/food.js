import Food from "../models/food.js";

//create food
export const save_food = async (req, res) => {
    try {

      if (Array.isArray(req.body)) {
        // validate all
        for (let f of req.body) {
          if (!f.name || !f.price || !f.category || !f.image) {
            return res.status(400).json({ message: "Each product must have name, price, category, image" });
          }
        }
  
        const foods = await Food.insertMany(req.body);
        return res.status(201).json({
          message: "Foods saved successfully",
          count: foods.length,
          foods,
        });
      }

      const { name, description, category, price, image, rating, discount } = req.body;
  
      // Validation (basic example)
      if (!name || !price || !category || !image) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }
  
      const food = await Food.create({
        name,
        description,
        category,
        price,
        image,
        rating,
        discount,
      });
  
      res.status(201).json({
        message: "Food saved successfully",
        food, // send back the created item (useful for frontend)
      });
    } catch (error) {
      console.error("Error saving food:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  export const get_food = async (req, res) => {
    try {
      const foods = await Food.find();
  
      res.status(200).json({
        success: true,
        message: "Food fetched successfully",
        count: foods.length,
        foods,
      });
    } catch (error) {
      console.error("Error fetching food:", error);
      res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };