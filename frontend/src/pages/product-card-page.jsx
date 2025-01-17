import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, X } from 'lucide-react';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { useCart } from '../contexts/CartContext';
import logo from '../assets/logo.jpg';
import LoadingSpinner from '../components/spinner.jsx'; // Import custom loading spinner
import SuccessAlert from '../components/OrderPlacedSuccessfully.jsx'; // Import SuccessAlert component

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/#footer' },
];

const ProductCardPage = () => {
  const [addingToCart, setAddingToCart] = useState(false);
  const [showAddToCartAlert, setShowAddToCartAlert] = useState(false); // State for add to cart alert
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    street: '',
  });
  const [loading, setLoading] = useState(false); // New loading state
  const [showAlert, setShowAlert] = useState(false); // State for success alert

  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = location.state?.product || {
    id: 'default-product',
    name: 'Product Name',
    image: '/placeholder.svg?height=400&width=400',
    price: 'Rs 1000',
    rating: 4.5,
    description: 'No description available for this product.',
  };

  const handleAddToCart = () => {
    setAddingToCart(true);
    addToCart(product);
    setTimeout(() => {
      setAddingToCart(false);
      setShowAddToCartAlert(true); // Show success alert
      setTimeout(() => setShowAddToCartAlert(false), 3000); // Hide alert after 3 seconds
    }, 1000);
  };

  const handleLinkClick = (href) => {
    if (href.startsWith('/#')) {
      const section = document.querySelector(href.replace('/', ''));
      section && section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    const templateParams = {
      name: userInfo.name,
      message: `
        Product Name: ${product.name}
        Price: ${product.price}
        Description: ${product.description}
        
        Customer Details:
        Name: ${userInfo.name}
        Email: ${userInfo.email}
        Phone: ${userInfo.phone}
        Address: ${userInfo.address}, ${userInfo.street}
      `,
    };

    try {
      await emailjs.send('service_uzqy9ri', 'template_vyecb2o', templateParams, 'jzNLC7YoCPX13aoOY');
      setShowAlert(true); // Show success alert
      setShowModal(false);
      setUserInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        street: '',
      });
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header
        logo={logo}
        brandName="Da-chi"
        links={quickLinks}
        onLinkClick={handleLinkClick}
      />
      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.rating})
              </span>
            </div>
            <p className="text-2xl font-semibold mb-4">Rs {product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex space-x-4">
              <motion.button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors ${
                  addingToCart ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </motion.button>
              <motion.button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-white text-black border-2 border-black rounded-lg hover:bg-gray-100 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>
      </main>
      <Footer quickLinks={quickLinks} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          {loading ? ( // Conditional rendering for loading spinner
            <LoadingSpinner size="xl" message="Placing your order..." fullScreen />
          ) : (
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Cash on Delivery</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="mb-4 text-gray-600">
                We are currently dealing with cash on delivery. Please fill in your details to place the order.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={userInfo.street}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Submit Order
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {showAddToCartAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          {product.name} has been added to your cart!
        </div>
      )}

      {showAlert && (
        <SuccessAlert 
          message="Order placed successfully!" 
          duration={3000}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default ProductCardPage;