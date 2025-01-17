import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';

interface AnimatedAddToCartButtonProps {
  onClick: () => void;
  className?: string;
}

const AnimatedAddToCartButton: React.FC<AnimatedAddToCartButtonProps> = ({ onClick, className = '' }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(true);
    onClick();
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden px-4 py-2 rounded-lg font-semibold text-white ${
        isAdded ? 'bg-green-600' : 'bg-black'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {!isAdded ? (
          <motion.div
            key="addToCart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </motion.div>
        ) : (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Check className="w-5 h-5 mr-2" />
            Added!
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ scale: 0, opacity: 0 }}
        animate={isAdded ? { scale: 100, opacity: 0.2 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

export default AnimatedAddToCartButton;
