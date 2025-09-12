import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, 
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema)

export default Food