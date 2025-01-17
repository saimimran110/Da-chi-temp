import React, { useRef } from 'react';
import { motion,useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';

// Import images (assuming these are available in your project)
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
import HydraAloe from '../assets/HydraAloe.jpg';
import sheaButter from '../assets/sheaButter.jpg';

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
    { id: 8, name: 'Creed', image: '/placeholder.svg?height=300&width=300', price: 'Rs 350', rating: 4.3 },
    { id: 9, name: 'Fresh Pine', image: '/placeholder.svg?height=300&width=300', price: 'Rs 180', rating: 4.6 },
    { id: 10, name: 'Tropical Burst', image: '/placeholder.svg?height=300&width=300', price: 'Rs 170', rating: 4.4 },
  ],
  lotions: [
    { id: 11, name: 'Hydra Aloe Cream', image: HydraAloe, price: 'Rs 200', rating: 4.8 },
    { id: 12, name: 'Shea Butter Cream', image: sheaButter, price: 'Rs 220', rating: 4.5 },
    { id: 13, name: 'Bliss', image: '/placeholder.svg?height=300&width=300', price: 'Rs 190', rating: 4.6 },
  ],
};

const productCategories = [
  { name: 'Perfumes', image: jazb },
  { name: 'Deodorants', image: real },
  { name: 'Lotions', image: logo },
];

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Our Products', href: '#products' },
  { name: 'Trending', href: '#trending' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#footer' },
];

const sliderImages = [
  slider1,
  '/placeholder.svg?height=600&width=1200',
  '/placeholder.svg?height=600&width=1200',
];

export default function UserDash() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const scrollContainerRefs = React.useRef({});
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const headerTranslate = useTransform(scrollY, [0, 100], [0, -10]);
  const categoriesRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const scroll = (direction, category) => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      const scrollAmount = 300;
      container.scrollTo({
        left: direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (product) => {
    navigate('/product', { state: { product } });
  };

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-black text-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        <Header
          logo={logo}
          brandName={<span className="text-black">Da-chi</span>}
          links={quickLinks}
          onLinkClick={scrollToSection}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="pt-16">
          <section id="home" className="py-20">
            <div className="container mx-auto px-4">
              <motion.div 
                className="text-6xl md:text-7xl font-bold text-center mb-8 font-['Playfair_Display']"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block"
                >
                  D
                </motion.span>
                <motion.span
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-block"
                >
                  a
                </motion.span>
                <motion.span
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="inline-block"
                >
                  -
                </motion.span>
                <motion.span
                  initial={{ x: 100, opacity: 0, rotate: 180 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="inline-block"
                >
                  c
                </motion.span>
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="inline-block"
                >
                  h
                </motion.span>
                <motion.span
                  initial={{ x: 100, opacity: 0, rotate: -180 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="inline-block"
                >
                  i
                </motion.span>
              </motion.div>
              <motion.p 
                className="text-xl md:text-2xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                Discover our exquisite range of perfumes, deodorants, and lotions. Elevate your personal care routine with Da-chi.
              </motion.p>
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                <button 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  onClick={scrollToCategories}
                >
                  Explore Our Collection
                </button>
              </motion.div>
            </div>
          </section>

          <section className="relative h-[80vh] overflow-hidden">
            {sliderImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">Discover Beauty</h2>
                    <p className="text-xl md:text-2xl mb-8">Elevate your senses with our premium collection</p>
                    <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-purple-100 transition duration-300">
                      Shop Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </section>

          <motion.section
            id="products"
            className="py-20 bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            ref={categoriesRef}
          >
            <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Playfair_Display'] text-black">
  Our Product Categories
</h2>
<div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {productCategories.map((category, index) => (
                  <motion.div 
                    key={index}
                    className="category-circle w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative w-full h-full group">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-60">
                        <h3 className="text-white text-3xl font-bold transform transition-transform duration-300 group-hover:scale-110">{category.name}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="trending"
            className="py-20 bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Playfair_Display']">Trending Products</h2>
              
              <div className="space-y-16">
                {Object.entries(trendingProducts).map(([category, products], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <h3 className="text-3xl font-semibold mb-6 capitalize font-['Playfair_Display']">{category}</h3>
                    <div className="relative">
                      <div 
                        ref={el => scrollContainerRefs.current[category] = el}
                        className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
                      >
                        {products.map((product, index) => (
                          <motion.div
                            key={product.id}
                            className="flex-shrink-0 w-72 md:w-80 bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            onClick={() => handleProductClick(product)}
                          >
                            <div className="relative h-64 w-full">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                              />
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-700">
                              <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                              <div className="flex justify-between items-center mb-2">
                                <p className="text-gray-600 dark:text-gray-300 font-bold">{product.price}</p>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <button 
                        onClick={() => scroll('left', category)} 
                        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => scroll('right', category)}
                        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="about"
            className="py-20 bg-white dark:bg-gray-900"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Playfair_Display']">About Da-chi</h2>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Da-chi is more than just a cosmetics brand; it's a celebration of individuality and self-expression. 
                  Founded with a passion for creating high-quality, innovative products, we strive to enhance your 
                  natural beauty and boost your confidence.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Our team of experts works tirelessly to bring you the finest fragrances, nourishing lotions, and 
                  effective deodorants. We believe in the power of self-care and the joy it brings to everyday life.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Join us on this journey of self-discovery and empowerment. With Da-chi, you're not just choosing a 
                  product; you're embracing a lifestyle of elegance and confidence.
                </p>
              </div>
            </div>
          </motion.section>
        </main>

        <footer id="footer" className="bg-gray-900 dark:bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 font-['Playfair_Display']">Da-chi Cosmetics</h3>
                <p className="text-gray-400 mb-4">Elevating your personal care experience.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <button 
                        onClick={() => scrollToSection(link.href)} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
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
    </div>
  );
}

