import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Flame
} from 'lucide-react';

// GlassCard component
const GlassCard = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

const PopularDishes = () => {
  const [cart, setCart] = useState({});
  const [dishes, setDishes] = useState([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Fetch dishes data from backend
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('https://api.example.com/dishes'); // Replace with your API endpoint
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  // Add/Remove from Cart
  const updateCart = (id, change) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = currentQty + change;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Popular{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              Dishes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Taste the most loved dishes across cuisines, freshly prepared for you
          </p>
        </motion.div>

        {/* Dishes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dishes.map((dish) => (
            <motion.div
              key={dish.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <GlassCard className="overflow-hidden h-full">
                {/* Dish Image */}
                <div className="relative h-48">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Best Seller Badge */}
                  {dish.bestSeller && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full px-3 py-1 flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      Best Seller
                    </div>
                  )}
                </div>

                {/* Dish Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {dish.description}
                  </p>

                  {/* Cuisine & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-lg">
                      {dish.cuisine}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      {dish.rating}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dish.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price & Cart Controls */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{dish.price}
                    </span>
                    {cart[dish.id] ? (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateCart(dish.id, -1)}
                          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-semibold">{cart[dish.id]}</span>
                        <button 
                          onClick={() => updateCart(dish.id, 1)}
                          className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => updateCart(dish.id, 1)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularDishes;
