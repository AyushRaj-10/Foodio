import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Utensils, 
  Filter, 
  Search, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import GlassCard from './GlassCard';

const FeaturedCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'popular', 'trending', 'new'
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Comprehensive categories data
  const allCategories = [
    { 
      name: 'Pizza', 
      icon: '🍕', 
      color: 'from-red-500 to-pink-500', 
      dishes: '150+ dishes',
      avgTime: '25-30 min',
      rating: 4.8,
      trending: true,
      popular: true,
      restaurants: 45
    },
    { 
      name: 'Burgers', 
      icon: '🍔', 
      color: 'from-yellow-500 to-orange-500', 
      dishes: '80+ dishes',
      avgTime: '15-20 min',
      rating: 4.6,
      trending: false,
      popular: true,
      restaurants: 32
    },
    { 
      name: 'Sushi', 
      icon: '🍣', 
      color: 'from-green-500 to-teal-500', 
      dishes: '120+ dishes',
      avgTime: '35-40 min',
      rating: 4.9,
      trending: true,
      popular: false,
      restaurants: 18
    },
    { 
      name: 'Desserts', 
      icon: '🍰', 
      color: 'from-pink-500 to-purple-500', 
      dishes: '200+ dishes',
      avgTime: '20-25 min',
      rating: 4.7,
      trending: false,
      popular: true,
      restaurants: 28
    },
    { 
      name: 'Indian', 
      icon: '🍛', 
      color: 'from-orange-500 to-red-500', 
      dishes: '300+ dishes',
      avgTime: '30-35 min',
      rating: 4.8,
      trending: true,
      popular: true,
      restaurants: 67
    },
    { 
      name: 'Chinese', 
      icon: '🥟', 
      color: 'from-red-600 to-yellow-500', 
      dishes: '180+ dishes',
      avgTime: '25-30 min',
      rating: 4.5,
      trending: false,
      popular: true,
      restaurants: 39
    },
    { 
      name: 'Italian', 
      icon: '🍝', 
      color: 'from-green-600 to-red-500', 
      dishes: '140+ dishes',
      avgTime: '30-35 min',
      rating: 4.7,
      trending: false,
      popular: false,
      restaurants: 25
    },
    { 
      name: 'Mexican', 
      icon: '🌮', 
      color: 'from-yellow-600 to-red-600', 
      dishes: '95+ dishes',
      avgTime: '20-25 min',
      rating: 4.4,
      trending: true,
      popular: false,
      restaurants: 16
    },
    { 
      name: 'Thai', 
      icon: '🍜', 
      color: 'from-red-500 to-orange-600', 
      dishes: '110+ dishes',
      avgTime: '25-30 min',
      rating: 4.6,
      trending: false,
      popular: false,
      restaurants: 22
    },
    { 
      name: 'Healthy', 
      icon: '🥗', 
      color: 'from-green-400 to-emerald-500', 
      dishes: '85+ dishes',
      avgTime: '15-20 min',
      rating: 4.3,
      trending: true,
      popular: false,
      restaurants: 19
    },
    { 
      name: 'BBQ', 
      icon: '🍖', 
      color: 'from-amber-600 to-red-700', 
      dishes: '75+ dishes',
      avgTime: '40-45 min',
      rating: 4.5,
      trending: false,
      popular: false,
      restaurants: 14
    },
    { 
      name: 'Seafood', 
      icon: '🦐', 
      color: 'from-blue-500 to-teal-600', 
      dishes: '90+ dishes',
      avgTime: '35-40 min',
      rating: 4.7,
      trending: true,
      popular: false,
      restaurants: 21
    }
  ];

  // Filter categories based on selected filter
  const filteredCategories = allCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'popular' && category.popular) ||
      (filterType === 'trending' && category.trending) ||
      (filterType === 'new' && category.rating >= 4.7);
    
    return matchesSearch && matchesFilter;
  });

  // Auto-slide for featured categories
  useEffect(() => {
    if (filteredCategories.length > 6) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => 
          prev >= Math.ceil(filteredCategories.length / 6) - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filteredCategories.length]);

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Categories', count: allCategories.length },
    { value: 'popular', label: 'Popular', count: allCategories.filter(c => c.popular).length },
    { value: 'trending', label: 'Trending', count: allCategories.filter(c => c.trending).length },
    { value: 'new', label: 'Top Rated', count: allCategories.filter(c => c.rating >= 4.7).length }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 border border-red-200 mb-6">
            <Utensils className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Explore Cuisines</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            What's Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
              Craving?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From comfort food to exotic flavors, discover your next favorite meal from thousands of dishes
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <GlassCard className="p-6" hover={false}>
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cuisines..."
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-gray-500" />
                {filterOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterType(option.value)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      filterType === option.value
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                        : 'bg-white/50 text-gray-700 hover:bg-white/70 border border-white/30'
                    }`}
                  >
                    {option.label}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      filterType === option.value
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {option.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Navigation Arrows for Mobile */}
          {filteredCategories.length > 6 && (
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 rounded-xl bg-white/50 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(filteredCategories.length / 6) }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-red-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentSlide(Math.min(Math.ceil(filteredCategories.length / 6) - 1, currentSlide + 1))}
                disabled={currentSlide >= Math.ceil(filteredCategories.length / 6) - 1}
                className="p-2 rounded-xl bg-white/50 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <GlassCard
                  className="p-6 text-center cursor-pointer group-hover:shadow-2xl transition-all duration-500"
                  onClick={() => setSelectedCategory(category)}
                >
                  {/* Category Icon */}
                  <div className="relative mb-4">
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    
                    {/* Trending Badge */}
                    {category.trending && (
                      <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🔥</span>
                      </div>
                    )}
                  </div>

                  {/* Category Details */}
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.dishes}</p>
                  <p className="text-sm text-gray-500">{category.avgTime} | {category.restaurants} Restaurants</p>
                  <p className="text-sm text-yellow-500 font-semibold">⭐ {category.rating}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
