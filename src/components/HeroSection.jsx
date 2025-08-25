import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Truck, 
  Zap, 
  ArrowRight,
  Play,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import GlassCard from './GlassCard';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Delhi, India');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, -50]);

  // Auto-updating stats
  const [stats, setStats] = useState({
    customers: 50000,
    restaurants: 2000,
    cities: 100
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        customers: prev.customers + Math.floor(Math.random() * 10),
        restaurants: prev.restaurants + Math.floor(Math.random() * 3),
        cities: prev.cities + Math.floor(Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Popular searches
  const popularSearches = [
    { term: 'Pizza', trend: '+15%' },
    { term: 'Biryani', trend: '+22%' },
    { term: 'Burger', trend: '+8%' },
    { term: 'Sushi', trend: '+31%' }
  ];

  // Quick action buttons
  const quickActions = [
    { 
      icon: <Zap className="h-5 w-5" />, 
      label: 'Quick Order', 
      color: 'from-yellow-400 to-orange-500',
      description: 'Repeat last order'
    },
    { 
      icon: <Star className="h-5 w-5" />, 
      label: 'Top Rated', 
      color: 'from-green-400 to-emerald-500',
      description: 'Highest rated nearby'
    },
    { 
      icon: <Clock className="h-5 w-5" />, 
      label: 'Fast Delivery', 
      color: 'from-blue-400 to-cyan-500',
      description: 'Under 20 minutes'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"
    >
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-24 -left-16 h-96 w-96 rounded-full bg-gradient-to-br from-red-400/20 to-pink-400/20 blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-20 -right-16 h-80 w-80 rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 blur-3xl animate-pulse"
        />
        <motion.div 
          style={{ y: y3 }}
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-yellow-400/20 to-red-400/20 blur-3xl animate-pulse"
        />
        
        {/* Floating elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-red-200 to-orange-200 rounded-2xl opacity-30"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-200 to-red-200 rounded-full opacity-40"
          style={{ animationDelay: '3s' }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-40 pb-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 items-center gap-16"
        >
          {/* Left Content */}
          <div className="space-y-8">
            {/* Hero Title */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-100 to-orange-100 border border-red-200">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  #1 Food Delivery Platform
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900">
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Hungry?
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600"
                >
                  We Deliver
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  Happiness
                </motion.span>
              </h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-700 leading-relaxed max-w-lg"
              >
                Experience lightning-fast delivery from your favorite restaurants. 
                Fresh, hot, and delivered with love to your doorstep in under 30 minutes.
              </motion.p>
            </motion.div>

            {/* Enhanced Search Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="relative">
                <GlassCard className="p-3" hover={false}>
                  <div className="flex items-center">
                    {/* Location Selector */}
                    <div className="flex items-center gap-3 px-4 border-r border-white/20">
                      <MapPin className="h-5 w-5 text-red-500" />
                      <select 
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        className="bg-transparent text-gray-800 focus:outline-none cursor-pointer font-medium"
                      >
                        <option>Delhi, India</option>
                        <option>Mumbai, India</option>
                        <option>Bangalore, India</option>
                        <option>Chennai, India</option>
                      </select>
                    </div>
                    
                    {/* Search Input */}
                    <div className="flex-1 px-4">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search restaurants, dishes, or cuisines..."
                        className="w-full py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
                      />
                    </div>
                    
                    {/* Search Button */}
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <Search className="h-5 w-5" />
                      Search
                    </motion.button>
                  </div>
                </GlassCard>
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap gap-3">
                <span className="text-sm text-gray-600 font-medium">Popular:</span>
                {popularSearches.map((search) => (
                  <motion.button
                    key={search.term}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 rounded-full bg-white/50 border border-white/30 text-sm text-gray-700 hover:bg-white/70 transition-all duration-300 flex items-center gap-2"
                  >
                    {search.term}
                    <span className="text-xs text-green-600 font-medium">{search.trend}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-2xl bg-white/30 border border-white/40 text-left hover:bg-white/40 transition-all duration-300 group"
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${action.color} text-white mb-3 group-hover:scale-110 transition-all duration-300`}>
                    {action.icon}
                  </div>
                  <div className="font-bold text-gray-900 mb-1">{action.label}</div>
                  <div className="text-sm text-gray-600">{action.description}</div>
                </motion.button>
              ))}
            </motion.div>

            {/* Main CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                <Zap className="h-5 w-5" />
                Order Now
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl border-2 border-red-500 text-red-600 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-3"
              >
                Explore Menu
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              {/* Video Play Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="px-6 py-4 rounded-2xl bg-white/30 border border-white/40 text-gray-800 font-medium hover:bg-white/50 transition-all duration-300 flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white ml-0.5" />
                </div>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Live Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 pt-6">
              {[
                { label: 'Happy Customers', value: stats.customers, suffix: '+', icon: <Users className="h-5 w-5" /> },
                { label: 'Partner Restaurants', value: stats.restaurants, suffix: '+', icon: <Award className="h-5 w-5" /> },
                { label: 'Cities Served', value: stats.cities, suffix: '+', icon: <MapPin className="h-5 w-5" /> }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-red-500 group-hover:scale-110 transition-all duration-300">
                      {stat.icon}
                    </div>
                    <motion.div
                      key={stat.value}
                      initial={{ scale: 1.2, color: '#ef4444' }}
                      animate={{ scale: 1, color: '#dc2626' }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-black"
                    >
                      {stat.value.toLocaleString()}{stat.suffix}
                    </motion.div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div variants={itemVariants} className="relative">
            {/* Main Hero Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 via-orange-200 to-yellow-200 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                alt="Delicious food spread including various cuisines like pizza, burgers, salad, and desserts on a beautiful wooden table"
                className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              
              {/* Play Button Overlay */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <div className="h-16 w-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Play className="h-6 w-6 text-red-500 ml-1" />
                </div>
              </motion.button>
            </div>
            
            {/* Floating Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50, x: -50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <GlassCard className="absolute -top-6 -left-6 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Fast Delivery</div>
                    <div className="text-sm text-gray-600">Under 30 mins</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, x: 50 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <GlassCard className="absolute -bottom-6 -right-6 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Top Rated</div>
                    <div className="text-sm text-gray-600">4.9/5 Stars</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <GlassCard className="absolute top-1/2 -right-8 p-4 mt-8">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">Free Delivery</div>
                    <div className="text-xs text-gray-600">On orders above ₹299</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating Food Items */}
            <motion.div
              animate={{ y: [-5, 5, -5], rotate: [-1, 1, -1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-12 right-1/4 w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center text-2xl shadow-lg"
            >
              🍕
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5], rotate: [1, -1, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-8 left-1/4 w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center text-xl shadow-lg"
            >
              🍔
            </motion.div>

            <motion.div
              animate={{ y: [-3, 3, -3], rotate: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/3 -left-8 w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-lg shadow-lg"
            >
              🍣
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              ×
            </button>
            
            {/* Video Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-semibold">Foodio Experience Video</p>
                <p className="text-gray-300">See how we deliver happiness to your doorstep</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
