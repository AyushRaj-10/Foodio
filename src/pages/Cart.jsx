import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  CreditCard,
  MapPin,
  Clock,
  Tag,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';
import { useCart } from '../Context/CartContenxt';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate prices
  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.05; // 5% tax
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + deliveryFee + tax - discountAmount;

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toUpperCase() === 'FOODIO20') {
      setDiscount(20);
    } else if (promoCode.toUpperCase() === 'FIRST10') {
      setDiscount(10);
    } else {
      alert('Invalid promo code');
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Navigate to payment page
    setTimeout(() => {
      navigate('/payment');
    }, 500);
  };

  const cartVariants = {
    closed: { x: '100%' },
    open: { x: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl"
      >
        <ShoppingCart className="h-6 w-6" />
        {getCartCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {getCartCount()}
          </span>
        )}
      </motion.button>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            variants={cartVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-sm font-semibold">
                    {getCartCount()} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Deliver to: Delhi, 110001</span>
                  </div>
                  <button className="text-orange-500 text-sm font-medium hover:underline">
                    Change
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Delivery in 30-40 mins</span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 text-center mb-6">
                      Add some delicious items to get started!
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/');
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          transition={{ delay: index * 0.1 }}
                          className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex gap-4">
                            <img
                              src={item.image || 'https://via.placeholder.com/80'}
                              alt={item.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </button>
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors"
                                  >
                                    <Plus className="h-4 w-4 text-orange-600" />
                                  </button>
                                </div>
                                <span className="font-bold text-lg">₹{item.price * item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Clear Cart Button */}
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>

              {/* Price Summary & Checkout */}
              {cartItems.length > 0 && (
                <div className="border-t px-6 py-4 space-y-4">
                  {/* Promo Code */}
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-orange-100 text-orange-600 font-medium rounded-lg hover:bg-orange-200 transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-orange-600">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    {isCheckingOut ? 'Processing...' : 'Proceed to Payment'}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
