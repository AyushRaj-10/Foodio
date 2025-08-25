import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin,
  Send,
  ChevronRight,
  Clock,
  Shield,
  Award,
  Smartphone,
  Heart,
  Star,
  ArrowUp,
  Globe,
  CreditCard,
  Truck,
  HeadphonesIcon
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Footer Links Data
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#', badge: 'Hiring' },
      { name: 'Team', href: '#' },
      { name: 'Foodio One', href: '#', badge: 'New' },
      { name: 'Foodio Pro', href: '#' },
      { name: 'Foodio for Work', href: '#' }
    ],
    contact: [
      { name: 'Help & Support', href: '#' },
      { name: 'Partner with us', href: '#' },
      { name: 'Ride with us', href: '#' },
      { name: 'Report Fraud', href: '#' }
    ],
    legal: [
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Offer Terms', href: '#' },
      { name: 'Phishing & Fraud', href: '#' },
      { name: 'Corporate Policies', href: '#' }
    ],
    explore: [
      { name: 'Popular Cuisines', href: '#' },
      { name: 'Popular Restaurants', href: '#' },
      { name: 'Cities We Deliver', href: '#' },
      { name: 'Sitemap', href: '#' }
    ]
  };

  // Social Links
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', name: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', name: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', name: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: <Youtube className="h-5 w-5" />, href: '#', name: 'Youtube', color: 'hover:bg-red-600' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', name: 'LinkedIn', color: 'hover:bg-blue-700' }
  ];

  // Payment Methods
  const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'GPay', 'PhonePe', 'Paytm', 'UPI', 'Net Banking'];

  // App Features
  const appFeatures = [
    { icon: <Truck className="h-5 w-5" />, text: 'Live Order Tracking' },
    { icon: <Clock className="h-5 w-5" />, text: '30 min Delivery' },
    { icon: <Shield className="h-5 w-5" />, text: '100% Safe & Secure' },
    { icon: <Award className="h-5 w-5" />, text: 'Best Prices' }
  ];

  // Cities
  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Gurgaon'
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  🍕 Stay Updated with Delicious Deals!
                </h3>
                <p className="text-white/90 text-lg">
                  Subscribe to our newsletter and never miss out on exclusive offers, 
                  new restaurant launches, and special discounts.
                </p>
              </div>
              <div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 transition-all duration-300"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    Subscribe
                    <Send className="h-4 w-4" />
                  </motion.button>
                </form>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-white flex items-center gap-2"
                  >
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    Successfully subscribed! Check your email for a welcome gift.
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Foodio
              </h2>
              <p className="text-gray-400 mt-2">Delivering Happiness Since 2020</p>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              India's most loved food delivery platform. Order from 50,000+ restaurants 
              across 100+ cities with lightning-fast delivery.
            </p>

            {/* App Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-orange-400">{feature.icon}</span>
                  {feature.text}
                </div>
              ))}
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-4 py-3 bg-black rounded-xl hover:bg-gray-900 transition-all duration-300 border border-gray-700"
              >
                <Smartphone className="h-8 w-8" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-4 py-3 bg-black rounded-xl hover:bg-gray-900 transition-all duration-300 border border-gray-700"
              >
                <Smartphone className="h-8 w-8" />
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">For Foodies</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Contact Us</h3>
            <div className="space-y-4">
              <a href="tel:1234567890" className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors">
                <Phone className="h-5 w-5" />
                <span>123-456-7890</span>
              </a>
              <a href="mailto:support@foodio.com" className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors">
                <Mail className="h-5 w-5" />
                <span>support@foodio.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-5 w-5 mt-1" />
                <span>
                  123 Food Street,<br />
                  Mumbai, MH 400001
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <HeadphonesIcon className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="font-bold text-lg mb-4 text-orange-400">We Deliver To</h3>
          <div className="flex flex-wrap gap-3">
            {popularCities.map((city) => (
              <a
                key={city}
                href="#"
                className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-orange-400 transition-all duration-200"
              >
                {city}
              </a>
            ))}
            <a
              href="#"
              className="px-4 py-2 bg-orange-500/20 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-all duration-200 flex items-center gap-2"
            >
              View All Cities
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Social Links & Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Social Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-400">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`h-12 w-12 rounded-xl bg-gray-800 flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:shadow-lg`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-400">We Accept</h3>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-3 py-2 bg-gray-800 rounded-lg text-gray-300 text-sm hover:bg-gray-700 transition-all duration-200"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>English</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>100% Secure Payments</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Foodio Technologies Pvt. Ltd. All rights reserved.
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-300"
                title="Back to top"
              >
                <ArrowUp className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Made with Love */}
      <div className="bg-gray-950 py-4 text-center">
        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
          Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> in India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
