import React, { useState, useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";

const AddMenu = () => {
  const { SaveFood, GetFood, foods } = useContext(AdminContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    rating: "",
    discount: ""
  });

  useEffect(() => {
    GetFood(); // fetch on mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handler = async (e) => {
    e.preventDefault();
    await SaveFood(
      formData.name,
      formData.description,
      formData.category,
      Number(formData.price),
      formData.image,
      Number(formData.rating),
      Number(formData.discount)
    );

    await GetFood(); // refresh list after save

    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      image: "",
      rating: "",
      discount: ""
    });
  };

  // Helper to calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price - (price * discount) / 100;
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 mb-8 text-center">
        Foodio - Add New Menu Item
      </h1>

      <form onSubmit={handler} className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b border-orange-300 pb-2">
          Add Food Item
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="name" className="block text-red-700 font-semibold mb-2">
              Food Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter food name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-red-700 font-semibold mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="e.g. Appetizer, Main Course"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-red-700 font-semibold mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full border border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-red-700 font-semibold mb-2">
              Rating (0-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              placeholder="Enter rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              required
              className="w-full border border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="discount" className="block text-red-700 font-semibold mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              placeholder="Enter discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              step="1"
              className="w-full border border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-red-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full border border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-red-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter food description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-red-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 hover:from-red-700 hover:via-orange-700 hover:to-yellow-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition"
          >
            Save Food
          </button>
        </div>
      </form>

      <section>
        <h2 className="text-3xl font-extrabold mb-8 text-gray-900 border-b border-orange-300 pb-3">
          Menu Items
        </h2>
        {foods.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => {
              const discountedPrice = getDiscountedPrice(food.price, food.discount);
              const hasDiscount = food.discount > 0;
              return (
                <li
                  key={food._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
                >
                  <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-extrabold text-gradient bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 mb-2">
                      {food.name}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-1">{food.category}</p>
                    <div className="mb-3">
                      {hasDiscount ? (
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 line-through text-lg">
                            ₹{food.price.toFixed(2)}
                          </span>
                          <span className="text-red-600 font-bold text-xl">
                            ₹{discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded">
                            {food.discount}% OFF
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-900 font-semibold text-xl">
                          ₹{food.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{food.description}</p>
                  </div>
                  <div className="mt-auto flex justify-between items-center text-sm text-gray-700 font-semibold">
                    <span>⭐ {food.rating.toFixed(1)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-lg">No food items available</p>
        )}
      </section>
    </div>
  );
};

export default AddMenu;
