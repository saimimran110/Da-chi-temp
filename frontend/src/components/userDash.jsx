import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

// Import images
import logo from '../assets/logo.jpg';
import jazb from '../assets/jazb.jpg';
import real from '../assets/real.jpg';

import buraq from '../assets/buraq.jpg';
import gul from '../assets/gul.jpg';
import janan from '../assets/janan.jpg';
import janoon from '../assets/janoon.jpg';
import mahoor from '../assets/mahoor.jpg';
import saif_ul_malook from '../assets/saif_ul_malook.jpg';

import slider1 from '../assets/slider1.jpg';

// Placeholder data
const trendingProducts = {
  perfumes: [
    { id: 1, name: 'Gul', image: gul, price: 'Rs 1799', rating: 4.5 },
    { id: 2, name: 'Janan', image: janan, price: 'Rs 1700', rating: 4.2 },
    { id: 3, name: 'Jazb', image: jazb, price: 'Rs 1800', rating: 4.7 },
    { id: 4, name: 'Buraq', image: buraq, price: 'Rs 2000', rating: 4.2 },
    { id: 5, name: 'Mahoor', image: mahoor, price: 'Rs 1800', rating: 4.7 },
    { id: 6, name: 'Janoon', image: janoon, price: 'Rs 1600', rating: 4.2 },
    { id: 7, name: 'Saif-ul-Malook', image: saif_ul_malook, price: 'Rs 2000', rating: 4.7 },
  ],
  deodorants: [
    { id: 8, name: 'Creed', image:'/placeholder.svg?height=300&width=300' , price: 'Rs 350', rating: 4.3 },
    { id: 9, name: 'Fresh Pine', image: '/placeholder.svg?height=300&width=300', price: 'Rs 180', rating: 4.6 },
    { id: 10, name: 'Tropical Burst', image: '/placeholder.svg?height=300&width=300', price: 'Rs 170', rating: 4.4 },
  ],
  lotions: [
    { id: 11, name: 'Coconut Dream', image: '/placeholder.svg?height=300&width=300', price: 'Rs 200', rating: 4.8 },
    { id: 12, name: 'Shea Butter Bliss', image: '/placeholder.svg?height=300&width=300', price: 'Rs 220', rating: 4.5 },
    { id: 13, name: 'Aloe Vera Soothe', image: '/placeholder.svg?height=300&width=300', price: 'Rs 190', rating: 4.6 },
  ],
};

const productCategories = [
  { name: 'Perfumes', image: jazb },
  { name: 'Deodorants', image: real },
  { name: 'Lotions', image: logo},
];

const quickLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Our Products', id: 'products' },
  { name: 'Trendings', id: 'trending' },
  { name: 'Contact Us', id: 'footer' },
];

const sliderImages = [
  slider1,
  '/placeholder.svg?height=600&width=1200',
  '/placeholder.svg?height=600&width=1200',
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRefs = useRef({});
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const headerTranslate = useTransform(scrollY, [0, 100], [0, -100]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scroll = (direction, category) => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      const scrollAmount = 300;
      const newScrollPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&family=Abril+Fatface&display=swap');
          
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
          }
          
          body {
            font-family: 'Montserrat', sans-serif;
          }

          .category-circle {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .category-circle:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
        `}
      </style>

      <motion.header 
        className="fixed w-full bg-black text-white z-50 transition-all duration-300"
        style={{ 
          opacity: headerOpacity,
          y: headerTranslate,
        }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold font-['Abril_Fatface']">Da-chi</span>
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
              <img src={logo} alt="Da-chi Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>
          <button onClick={toggleMenu} className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-black text-white shadow-lg z-50"
          >
            <div className="p-4">
              <button onClick={toggleMenu} className="mb-4 text-white">
                <X className="w-6 h-6" />
              </button>
              <nav className="flex flex-col space-y-4">
                {quickLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      scrollToSection(link.id);
                      toggleMenu();
                    }}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <section id="home" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">
              <Typewriter
                words={['Welcome to Da-chi', 'Discover Beauty', 'Elevate Your Style']}
                loop={0}
                cursor
                cursorStyle=""
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
              Discover our exquisite range of perfumes, deodorants, and lotions. Elevate your personal care routine with Da-chi.
            </p>
          </div>
        </section>

        <section className="relative h-96 overflow-hidden">
          {sliderImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </section>

        <motion.section
          id="products"
          className="py-12 bg-gray-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Product Categories</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {productCategories.map((category, index) => (
                <motion.div 
                  key={index}
                  className="category-circle w-64 h-64 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => {
                    // Redirect to category page
                    console.log(`Redirect to ${category.name} page`);
                    // Here you would typically use React Router to navigate to the respective page
                    // For example: history.push(`/category/${category.name.toLowerCase()}`);
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="trending"
          className="py-12 bg-gray-100"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trending Products</h2>
            
            <div className="space-y-16">
              {Object.entries(trendingProducts).map(([category, products], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 capitalize">{category}</h3>
                  <div className="relative">
                    <div 
                      ref={el => scrollContainerRefs.current[category] = el}
                      className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
                    >
                      {products.map((product, index) => (
                        <motion.div
                          key={product.id}
                          className="flex-shrink-0 w-72 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                          whileHover={{ 
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          }}
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity:  1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <div className="relative h-72 w-full">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 bg-white border-t border-gray-200">
                            <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-gray-600 font-bold">{product.price}</p>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                <span className="text-sm text-gray-600">{product.rating}</span>
                              </div>
                            </div>
                            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <button 
                      onClick={() => scroll('left', category)} 
                      className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => scroll('right', category)}
                      className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      <footer id="footer" className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Da-chi Cosmetics</h3>
              <p className="text-gray-400 mb-4">Elevating your personal care experience.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => scrollToSection(link.id)} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">Email: dachi6825@gmail.com</p>
              <p className="text-gray-400 mb-2">Phone: (+92)313 03494903</p>
              <p className="text-gray-400 mb-2">Phone: (+92)333 2306480</p>

              <p className="text-gray-400">Address: Lahore, Pakistan</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Da-chi Cosmetics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}