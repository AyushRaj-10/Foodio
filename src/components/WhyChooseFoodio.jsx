import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Truck, 
  Leaf, 
  DollarSign,
  Clock,
  Shield,
  Award,
  Users,
  Smartphone,
  HeartHandshake,
  MapPin,
  ChefHat,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Zap,
  Star
} from 'lucide-react';

const WhyChooseFoodio = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Comprehensive reasons data
  const allReasons = [
    {
      id: 1,
      icon: <Truck className="h-8 w-8" />,
      emoji: '🚚',
      title: 'Lightning Fast Delivery',
      shortDesc: 'Hot and fresh food delivered to your door quickly.',
      fullDesc: 'Our advanced logistics network ensures your food arrives hot and fresh within 30 minutes or less. Real-time tracking keeps you updated every step of the way.',
      stats: '30 min avg',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      category: 'service',
      features: ['Real-time tracking', 'Express delivery', 'Temperature-controlled bags'],
      rating: 4.9,
      improvement: '+15%'
    },
    {
      id: 2,
      icon: <Leaf className="h-8 w-8" />,
      emoji: '🌱',
      title: 'Fresh & Organic',
      shortDesc: 'We partner with local suppliers for top quality ingredients.',
      fullDesc: 'Every ingredient is carefully sourced from certified organic farms and local suppliers. We ensure farm-to-table freshness with daily quality checks.',
      stats: '100% Fresh',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      category: 'quality',
      features: ['Organic certified', 'Local sourcing', 'Daily fresh supplies'],
      rating: 4.8,
      improvement: '+22%'
    },
    {
      id: 3,
      icon: <DollarSign className="h-8 w-8" />,
      emoji: '💰',
      title: 'Best Value Prices',
      shortDesc: 'Delicious meals without breaking the bank.',
      fullDesc: 'Enjoy premium quality food at affordable prices. Our dynamic pricing and daily deals ensure you get the best value for your money.',
      stats: '40% Savings',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      category: 'value',
      features: ['Daily deals', 'Loyalty rewards', 'No hidden charges'],
      rating: 4.7,
      improvement: '+18%'
    },
    {
      id: 4,
      icon: <Shield className="h-8 w-8" />,
      emoji: '🛡️',
      title: 'Safe & Hygienic',
      shortDesc: 'Contactless delivery with highest safety standards.',
      fullDesc: 'All our partner restaurants follow strict hygiene protocols. Every order is sealed and delivered with contactless options for your safety.',
      stats: '100% Safe',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      category: 'safety',
      features: ['Contactless delivery', 'Sealed packaging', 'Hygiene certified'],
      rating: 5.0,
      improvement: '+25%'
    },
    {
      id: 5,
      icon: <Award className="h-8 w-8" />,
      emoji: '🏆',
      title: 'Premium Quality',
      shortDesc: 'Curated selection of top-rated restaurants.',
      fullDesc: 'We partner only with the best restaurants that meet our strict quality standards. Every meal is a guarantee of excellence.',
      stats: '5★ Partners',
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-50 to-rose-50',
      category: 'quality',
      features: ['Curated restaurants', 'Quality guarantee', 'Chef specials'],
      rating: 4.9,
      improvement: '+20%'
    },
    {
      id: 6,
      icon: <Users className="h-8 w-8" />,
      emoji: '👥',
      title: '24/7 Support',
      shortDesc: 'Round-the-clock customer service for all your needs.',
      fullDesc: 'Our dedicated support team is available 24/7 to assist you with orders, refunds, or any queries. Your satisfaction is our priority.',
      stats: '< 2 min response',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      category: 'service',
      features: ['Live chat', 'Phone support', 'Quick resolution'],
      rating: 4.8,
      improvement: '+30%'
    },
    {
      id: 7,
      icon: <Smartphone className="h-8 w-8" />,
      emoji: '📱',
      title: 'Smart App Experience',
      shortDesc: 'Intuitive app with personalized recommendations.',
      fullDesc: 'Our AI-powered app learns your preferences and suggests meals you\'ll love. Easy ordering, multiple payment options, and order scheduling.',
      stats: '4.8★ App Rating',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50',
      category: 'technology',
      features: ['AI recommendations', 'One-tap reorder', 'Schedule orders'],
      rating: 4.8,
      improvement: '+35%'
    },
    {
      id: 8,
      icon: <MapPin className="h-8 w-8" />,
      emoji: '📍',
      title: 'Wide Coverage',
      shortDesc: 'Serving 100+ cities with expanding network.',
      fullDesc: 'From metros to tier-2 cities, we\'re everywhere you are. Our expanding network ensures you never have to compromise on food choices.',
      stats: '100+ Cities',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      category: 'service',
      features: ['Pan-India delivery', 'Local favorites', 'Global cuisines'],
      rating: 4.6,
      improvement: '+40%'
    },
    {
      id: 9,
      icon: <HeartHandshake className="h-8 w-8" />,
      emoji: '🤝',
      title: 'Community First',
      shortDesc: 'Supporting local businesses and communities.',
      fullDesc: 'We empower local restaurants and delivery partners, creating opportunities and supporting community growth.',
      stats: '50K+ Partners',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      category: 'social',
      features: ['Local empowerment', 'Fair wages', 'Community support'],
      rating: 4.9,
      improvement: '+28%'
    }
  ];

  // Filter categories
  const categories = [
    { id: 'all', label: 'All Features', count: allReasons.length },
    { id: 'service', label: 'Service', count: allReasons.filter(r => r.category === 'service').length },
    { id: 'quality', label: 'Quality', count: allReasons.filter(r => r.category === 'quality').length },
    { id: 'value', label: 'Value', count: allReasons.filter(r => r.category === 'value').length },
    { id: 'technology', label: 'Technology', count: allReasons.filter(r => r.category === 'technology').length }
  ];

  // Filter reasons based on selected category
  const filteredReasons = selectedCategory === 'all' 
    ? allReasons 
    : allReasons.filter(reason => reason.category === selectedCategory);

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

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 overflow-hidden relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 mb-6">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">
              Why We're Different
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Why Choose{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              Foodio?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of technology, quality, and service that makes us 
            the most trusted food delivery platform in India
          </p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: 'Happy Customers', value: '2M+', icon: '😊' },
              { label: 'Partner Restaurants', value: '50K+', icon: '🍽️' },
              { label: 'Cities Covered', value: '100+', icon: '🏙️' },
              { label: 'Orders Delivered', value: '10M+', icon: '📦' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredReasons.map((reason) => (
  <motion.div
    key={reason.id}
    variants={itemVariants}
    whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2 }}
    onHoverStart={() => setHoveredCard(reason.id)}
    onHoverEnd={() => setHoveredCard(null)}
    className="group relative"
  >
    <div className="h-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg 
      hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-white/30">
      
      {/* Gradient Header */}
      <div className={`h-1.5 bg-gradient-to-r ${reason.color}`} />
      
      {/* Card Content */}
      <div className="p-5">
        {/* Icon + Stats */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            variants={floatingVariants}
            animate={hoveredCard === reason.id ? "animate" : ""}
            className={`h-12 w-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center shadow-md`}
          >
            <span className="text-white">{reason.icon}</span>
          </motion.div>

          <div className="flex flex-col items-end gap-1">
            <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-[11px] font-bold rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {reason.improvement}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{reason.rating}</span>
            </div>
          </div>
        </div>

        {/* Title & Short Desc */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {reason.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {reason.shortDesc}
        </p>

        {/* Expandable Description */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: hoveredCard === reason.id ? 'auto' : 0,
            opacity: hoveredCard === reason.id ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-xs text-gray-500 mb-2">
            {reason.fullDesc}
          </p>
        </motion.div>

        {/* Stats Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${reason.bgColor} mb-2`}>
          <Zap className="h-3.5 w-3.5 text-gray-700" />
          <span className="text-sm font-semibold text-gray-800">{reason.stats}</span>
        </div>

        {/* Features */}
        <div className="space-y-1 mb-2">
          {reason.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: hoveredCard === reason.id ? 1 : 0.7,
                x: hoveredCard === reason.id ? 0 : -3
              }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-1.5"
            >
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              <span className="text-xs text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Learn More Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-2.5 px-3 rounded-lg bg-gradient-to-r ${reason.color} 
            text-white text-sm font-semibold opacity-0 group-hover:opacity-100 
            transition-all duration-300 flex items-center justify-center gap-2`}
        >
          Learn More
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.button>
      </div>

      {/* Hover Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hoveredCard === reason.id ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 bg-gradient-to-br ${reason.bgColor} pointer-events-none rounded-2xl`}
      />
    </div>
  </motion.div>
))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-300 rounded-full blur-2xl" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Experience the Foodio Difference?
              </h3>
              <p className="text-lg mb-8 opacity-90">
                Join millions of happy customers who trust us for their daily meals
              </p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  Order Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-orange-600 transition-all duration-300"
                >
                  Download App
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseFoodio;
