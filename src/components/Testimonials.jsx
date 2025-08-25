import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'John Doe', feedback: 'Foodio is amazing! Fast delivery and great food!', rating: 5 },
  { name: 'Jane Smith', feedback: 'I love the variety of restaurants available!', rating: 4 },
  { name: 'Alex Johnson', feedback: 'Best food delivery experience ever!', rating: 5 },
  { name: 'Emily Davis', feedback: 'The app is user-friendly and the service is top-notch!', rating: 5 },
  { name: 'Michael Brown', feedback: 'Great deals and discounts on my favorite meals!', rating: 4 },
  { name: 'Sarah Wilson', feedback: 'Always on time and the food is always fresh!', rating: 5 },
];

const Testimonials = () => {
  return (
    <section className="p-12 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.name}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-lg bg-white/20"
          >
            <p className="italic text-gray-800">"{t.feedback}"</p>
            <div className="flex items-center justify-end mt-4">
              {Array.from({ length: t.rating }, (_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500" />
              ))}
            </div>
            <p className="mt-2 font-bold text-gray-900 text-right">- {t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
