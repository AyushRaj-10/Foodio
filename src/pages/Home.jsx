import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import PopularDishes from '../components/PopularDishes';
import WhyChooseFoodio from '../components/WhyChooseFoodio';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
   <>
      <Navbar />
      <HeroSection />
      <FeaturedCategories />
      <PopularDishes />
      <WhyChooseFoodio />
      <Testimonials />
      <Footer />
   </>
  )
}

export default Home