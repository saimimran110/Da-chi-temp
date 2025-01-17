import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { useCart } from '../contexts/CartContext';
import AnimatedAddToCartButton from '../components/AnimatedAddToCartButton.tsx'; // Import AnimatedAddToCartButton

// Import deodorant images (assuming these are available in your project)
import fresh from '../assets/real.jpg';
import cool from  '../assets/real.jpg';
import sport from  '../assets/real.jpg';
import logo from  '../assets/logo.jpg';

const deodorants = [
  { id: 1, name: 'Fresh', image: fresh, price: '299', rating: 4.5, description: 'A refreshing scent that keeps you cool all day.' },
  { id: 2, name: 'Cool', image: cool, price: '349', rating: 4.2, description: 'A cool and invigorating fragrance for active individuals.' },
  { id: 3, name: 'Sport', image: sport, price: '399', rating: 4.7, description: 'A sporty scent that energizes and revitalizes.' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Products', href: '#products' },
  { name: 'Contact', href: '#footer' },
];

const DeodorantPage = () => {
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
        <h2 className="text-3xl font-bold mb-8 font-['Playfair_Display']">Our Deodorants</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {deodorants.map((deodorant) => (
            <motion.div
              key={deodorant.id}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={deodorant.image}
                alt={deodorant.name}
                className="w-full h-64 object-cover rounded-md mb-4"
                onClick={() => handleViewProduct(deodorant)} // Navigate to ProductCardPage
              />
              <h3 className="text-2xl font-semibold mb-2">{deodorant.name}</h3>
              <p className="text-gray-600 mb-4">Rs {deodorant.price}</p>
              <AnimatedAddToCartButton
                onClick={() => handleAddToCart(deodorant)}
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

export default DeodorantPage;