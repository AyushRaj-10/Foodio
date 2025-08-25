import React, { useState, useEffect, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  User,
  Menu as MenuIcon,
  X,
  ChefHat,
  Bell,
  Heart,
  MapPin
} from 'lucide-react';
import GlassCard from './GlassCard';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Navbar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(2);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 20;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    let ticking = false;
    console.log(user)
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Navigation items
  const navItems = [
    { label: 'Home', href: '#home', active: true },
    { label: 'Restaurants', href: '#restaurants' },
    { label: 'Offers', href: '#offers', badge: 'New' },
    { label: 'Track Order', href: '#track' },
    { label: 'About', href: '#about' }
  ];

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const searchVariants = {
    closed: { width: 0, opacity: 0 },
    open: { width: '300px', opacity: 1 }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'
          }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <GlassCard
            className={`px-6 py-4 transition-all duration-500 ${isScrolled ? 'bg-white/25 backdrop-blur-3xl shadow-3xl' : 'bg-white/10'
              }`}
            variant={isScrolled ? 'elevated' : 'default'}
            hover={false}
          >
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-3 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <ChefHat className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                </div>
                <span className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
                  Foodio
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <button
                      className={`font-medium transition-all duration-300 hover:scale-105 relative ${item.active
                          ? 'text-red-600'
                          : 'text-gray-800 hover:text-red-600'
                        }`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="absolute -top-2 -right-6 px-2 py-0.5 text-xs bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Search Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hidden md:flex p-3 rounded-2xl hover:bg-white/20 transition-all duration-300 relative"
                >
                  <Search className="h-5 w-5 text-gray-800" />
                </motion.button>

                {/* Location */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  onClick={() => {navigate('/address')}}
                >
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-800">Delhi</span>
                </motion.button>

                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex relative p-3 rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <Bell className="h-5 w-5 text-gray-800" />
                  {user && notificationCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {notificationCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Wishlist
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex relative p-3 rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <Heart className="h-5 w-5 text-gray-800" />
                </motion.button> */}

                {/* Cart */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="h-5 w-5 text-gray-800" />
                  {user && cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Auth Buttons */}
                {!user ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hidden md:block px-6 py-2 text-gray-800 hover:text-red-600 font-medium transition-all duration-300"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-bold shadow-lg transition-all duration-300"
                      onClick={() => navigate('/register')}
                    >
                      Sign Up
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-2xl bg-red-500 text-white font-bold shadow-lg transition-all duration-300"
                    onClick={async () => {
                      await logout();
                      navigate('/login'); // redirect after logout
                    }}
                  >
                    Logout
                  </motion.button>
                )}

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-white/20 transition-all duration-300 mobile-menu-container"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMobileMenuOpen ? 'close' : 'menu'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMobileMenuOpen ?
                        <X className="h-6 w-6" /> :
                        <MenuIcon className="h-6 w-6" />
                      }
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="lg:hidden overflow-hidden mobile-menu-container"
                >
                  <div className="mt-4 py-4 border-t border-white/20">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between w-full text-left py-3 px-4 rounded-xl transition-all duration-300 hover:bg-white/10 ${item.active ? 'text-red-600 bg-white/5' : 'text-gray-800 hover:text-red-600'
                          }`}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.button>
                    ))}

                    {/* Mobile Actions */}
                    <div className="mt-4 pt-4 border-t border-white/20 space-y-3">
                      <button className="flex items-center gap-3 w-full py-3 px-4 text-gray-800 hover:text-red-600 hover:bg-white/10 rounded-xl transition-all duration-300">
                        <Search className="h-5 w-5" />
                        Search Food
                      </button>
                      <button className="flex items-center gap-3 w-full py-3 px-4 text-gray-800 hover:text-red-600 hover:bg-white/10 rounded-xl transition-all duration-300">
                        <MapPin className="h-5 w-5" />
                        Change Location
                      </button>
                      <button className="flex items-center gap-3 w-full py-3 px-4 text-gray-800 hover:text-red-600 hover:bg-white/10 rounded-xl transition-all duration-300">
                        <User  className="h-5 w-5" />
                        My Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <div className="flex items-start justify-center pt-32">
              <motion.div
                variants={searchVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={(e) => e.stopPropagation()}
              >
                <GlassCard className="p-2" hover={false}>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search restaurants, dishes, or cuisines..."
                      className="flex-1 px-6 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
                      autoFocus
                    />
                    <button className="px-6 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:shadow-lg transition-all duration-300">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
