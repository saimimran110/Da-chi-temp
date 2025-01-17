import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { useCart } from '../contexts/CartContext.js';
import AnimatedAddToCartButton from '../components/AnimatedAddToCartButton.tsx'; // Import AnimatedAddToCartButton

// Import perfume images (assuming these are available in your project)
import gul from '../assets/gul.jpg';
import janan from '../assets/janan.jpg';
import jazb from '../assets/jazb.jpg';
import buraq from '../assets/buraq.jpg';
import mahoor from '../assets/mahoor.jpg';
import janoon from '../assets/janoon.jpg';
import saif_ul_malook from '../assets/saif_ul_malook.jpg';
import logo from '../assets/logo.jpg';

const perfumes = [
  { id: 1, name: 'Gul', image: gul, price: '1799', rating: 4.5, description: 'A floral fragrance that captures the essence of blooming roses.' },
  { id: 2, name: 'Janan', image: janan, price: '1700', rating: 4.2, description: 'An alluring scent that embodies passion and desire.' },
  { id: 3, name: 'Jazb', image: jazb, price: '1800', rating: 4.7, description: 'A magnetic fragrance that draws others in with its captivating aroma.' },
  { id: 4, name: 'Buraq', image: buraq, price: '2000', rating: 4.2, description: 'A heavenly scent inspired by the mythical steed of Islamic tradition.' },
  { id: 5, name: 'Mahoor', image: mahoor, price: '1800', rating: 4.7, description: 'A melodious fragrance that resonates with the soul like enchanting music.' },
  { id: 6, name: 'Janoon', image: janoon, price: '1600', rating: 4.2, description: 'An intense and passionate scent for those who live life with fervor.' },
  { id: 7, name: 'Saif-ul-Malook', image: saif_ul_malook, price: '2000', rating: 4.7, description: 'A mystical fragrance inspired by the legendary lake of poets and lovers.' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Products', href: '#products' },
  { name: 'Contact', href: '#footer' },
];

const PerfumePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemsCount(cartItems.length);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleViewProduct = (product) => {
    navigate('/product', { state: { product } });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    
  };

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const section = document.querySelector(href);
      section && section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-amber-50 to-amber-100 text-gray-900'} font-sans`}>
      <Header 
        logo={logo} 
        brandName="Da-chi" 
        links={quickLinks} 
        onLinkClick={handleLinkClick}
      />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 font-['Playfair_Display']">Our Perfumes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {perfumes.map((perfume) => (
            <motion.div
              key={perfume.id}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-full h-64 object-cover rounded-md mb-4"
                onClick={() => handleViewProduct(perfume)} // Navigate to ProductCardPage
              />
              <h3 className="text-2xl font-semibold mb-2">{perfume.name}</h3>
              <p className="text-gray-600 mb-4">Rs {perfume.price}</p>
              <AnimatedAddToCartButton
                onClick={() => handleAddToCart(perfume)}
                className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer quickLinks={quickLinks} />
    </div>
  );
};

export default PerfumePage;