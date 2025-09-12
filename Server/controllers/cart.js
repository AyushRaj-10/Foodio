import { Cart } from "../models/cart.js";
import  User  from '../models/user.js'
import  Food  from '../models/food.js'

// ✅ 1. Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { user, food, quantity } = req.body;
    console.log("Add to cart payload:", req.body);

    // check if this food already exists in user's cart
    let cartItem = await Cart.findOne({ user , food });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
      await cartItem.populate("food");
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem,
      });
    }

    cartItem = await Cart.create({
      user,
      food,
      quantity: quantity || 1,
    });
    await cartItem.populate("food");
    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 2. Update Cart (set quantity)
export const updateCart = async (req, res) => {
  try {
    const { user, food, quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    const cartItem = await Cart.findOneAndUpdate(
      { user, food },
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 3. Delete from Cart
export const deleteFromCart = async (req, res) => {
  try {
    const { user, food } = req.body;

    const cartItem = await Cart.findOneAndDelete({ user, food });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    // assuming your route is something like /cart/:userId
    const { userId } = req.params;

    const cartItems = await Cart.find({ user: userId }).populate("food");

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      userId,
      cartItems: cartItems || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching cart",
      error: error.message,
    });
  }
};

