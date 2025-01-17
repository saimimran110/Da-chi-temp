import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { useCart } from '../contexts/CartContext.js';
import AnimatedAddToCartButton from '../components/AnimatedAddToCartButton.tsx'; // Import AnimatedAddToCartButton
import HydraAloe from '../assets/HydraAloe.jpg';
import sheaButter from '../assets/sheaButter.jpg';

const lotions = [
  { id: 1, name: 'Coconut Dream', price: 200, image: '/placeholder.svg?height=300&width=300', rating: 4.8 },
  { id: 2, name: 'Shea Butter Moisture', price: 220, image: sheaButter, rating: 4.5 },
  { id: 3, name: 'HydraAloe', price: 190, image: HydraAloe, rating: 4.6 },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Products', href: '#products' },
  { name: 'Contact', href: '#footer' },
];

const LotionCategoryPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // Scroll to top when the component loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleProductClick = (product) => {
    navigate('/product', { state: { product } }); // Pass product data to ProductCardPage
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 text-gray-900 font-sans">
      {showHeader && (
        <Header
          logo="/placeholder.svg?height=50&width=50"
          brandName="Da-chi"
          links={quickLinks}
          onLinkClick={handleLinkClick}
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <section id="home" className="text-center py-20 bg-amber-200 rounded-lg mb-16">
          <h1 className="text-5xl font-bold mb-4 font-['Playfair_Display']">Nourish Your Skin with Our Lotions</h1>
          <p className="text-xl mb-8">Discover our collection of hydrating and soothing lotions</p>
          <button
            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors inline-block"
          >
            Shop Now
          </button>
        </section>

        <h2 id="products" className="text-3xl font-bold mb-8 font-['Playfair_Display']">Our Lotions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {lotions.map((lotion) => (
            <motion.div
              key={lotion.id}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={lotion.image}
                alt={lotion.name}
                className="w-full h-64 object-cover rounded-md mb-4"
                onClick={() => handleProductClick(lotion)} // Navigate to ProductCardPage
              />
              <h3 className="text-2xl font-semibold mb-2">{lotion.name}</h3>
              <p className="text-gray-600 mb-4">Rs {lotion.price}</p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(lotion.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.18-5.934 5.779 1.402 8.178L12 18.904l-7.336 3.851 1.402-8.178-5.934-5.779 8.2-1.18L12 .587z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">{lotion.rating.toFixed(1)}</span>
              </div>
              <AnimatedAddToCartButton
                onClick={() => handleAddToCart(lotion)}
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

export default LotionCategoryPage;