import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  logo: string;
  brandName: string;
  links: Array<{ name: string; id: string; href: string }>;
  onLinkClick: (href: string) => void;
}

export default function Header({ logo, brandName, links, onLinkClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <motion.header 
        className="fixed w-full bg-white bg-opacity-90 backdrop-blur-md shadow-md z-50 transition-all duration-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt={`${brandName} Logo`} className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-bold font-['Playfair_Display']">{brandName}</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {links.map((link) => (
              <button
                key={link.id} // Ensure a unique key
                onClick={() => onLinkClick(link.href)}
                className="text-gray-700 hover:text-black transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-black transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-black transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50"
          >
            <div className="p-4">
              <button onClick={toggleMenu} className="mb-4 text-gray-700 hover:text-black transition-colors">
                <X className="w-6 h-6" />
              </button>
              <nav className="flex flex-col space-y-4">
                {links.map((link) => (
                  <button
                    key={link.id} // Ensure a unique key
                    onClick={() => {
                      onLinkClick(link.href);
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-black transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
