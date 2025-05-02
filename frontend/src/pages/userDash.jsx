import React, { useRef } from 'react';
import { motion,useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';
import Header from '../components/Header.tsx';
import { Divider, Stack, Box, Typography, Button, Grid2, Card, CardMedia, CardContent, IconButton, Container, ThemeProvider, createTheme } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

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
import duo1 from '../assets/real.jpg'
const trendingProducts = {
  PERFUMES: [
    { id: 1, name: 'Gul', image: gul, price: '1799', rating: 4.5 },
    { id: 2, name: 'Janan', image: janan, price: '1700', rating: 4.2 },
    { id: 3, name: 'Jazb', image: jazb, price: '1800', rating: 4.7 },
    { id: 4, name: 'Buraq', image: buraq, price: '2000', rating: 4.2 },
    { id: 5, name: 'Mahoor', image: mahoor, price: '1800', rating: 4.7 },
    { id: 6, name: 'Janoon', image: janoon, price: '1600', rating: 4.2 },
    { id: 7, name: 'Saif-ul-Malook', image: saif_ul_malook, price: '2000', rating: 4.7 },
  ],
  DEODRANTS: [
    { id: 8, name: 'Creed', image: duo1, price: '350', rating: 4.3 },
    { id: 9, name: 'Fresh Pine', image: duo1, price: '180', rating: 4.6 },
    { id: 10, name: 'Tropical Burst', image: duo1, price: '170', rating: 4.4 },
  ],
  LOTIONS: [
    { id: 11, name: 'Hydra Aloe Cream', image: HydraAloe, price: '200', rating: 4.8 },
    { id: 12, name: 'Shea Butter Cream', image: sheaButter, price: '220', rating: 4.5 },
    { id: 13, name: 'Bliss', image: sheaButter, price: '190', rating: 4.6 },
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#4a4a4a',
    },
  },
});

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
    window.scrollTo(0, 0);
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
    <ThemeProvider theme={theme}>
    <Box
    sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
      fontFamily: 'system-ui',
      // transition: 'background-color 300ms, color 300ms',
      // borderColor: isDarkMode ? 'grey.800' : 'grey.600',
      // borderWidth: 1,
      // borderStyle: 'solid'
    }}
  >
    <Box
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        fontFamily: 'system-ui',
      }}
    >
        <Header
          logo={logo}
          brandName={<span style={{ color: theme.palette.text.primary }}>Da-chi</span>}
          links={quickLinks}
          onLinkClick={scrollToSection}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        </Box>

        <main className="pt-16">
        {/* Logo and Description*/}
        <Box id="home" sx={{ 
          // py: 5, border:'1px solid gold', height:'40vh'
          height: { xs: '50vh', sm: '40vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          // border: '1px solid gold',
          fontFamily: 'ssytem-ui',
          }}>
            <Container maxWidth="lg">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
          >
            <Box sx={{ typography: 'h2', fontFamily: 'system-ui', fontWeight: 'bold', mb: {xs: 2, sm: 3, md:1} }}>
        
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
              </Box>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                <Typography
                  variant={{ xs: 'body1', sm: 'h6' }}
                  component="p"
                  sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    color: 'white',
                    fontFamily:'system-ui',
                    mb: { xs: 2, sm: 3, md:3 },
                    px: { xs: 2, sm: 0, md:2 }
                  }}
                >
                  Discover our exquisite range of perfumes, deodorants, and lotions. 
                  Elevate your personal care routine with Da-chi.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={scrollToCategories}
                  sx={{
                    bgcolor: 'primary.main',
                    py: { xs: 1.5, sm: 2, md: 2 },
                    px: { xs: 3, sm: 4, md: 2 },
                    borderRadius: '30px',
                    fontSize: { xs: '0.9rem', sm: '1rem', md:'1.1rem' },
                    boxShadow: 3,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px) scale(1.05)',
                    },
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  Explore Our Collection
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </Box>
          {/*
          <section className="relative h-[80vh] overflow-hidden">
            {sliderImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={image || "/placeholder.svg"} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
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
           */}

  {/* Product Categories Section */}
  <Box component="section" sx={{ py: 8, bgcolor: 'background.default', color: 'text.primary', height: { xs: '40vh', sm: '40vh', md: '70vh' },
   mb: 2, 
   // backgroundColor: '#87CEEB', 
   // color: 'red',
    display: 'flex', 
   justifyContent: 'center',
    alignItems: 'center', 
    fontFamily:'system-ui' }}>
  <motion.div
    id="products"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }}
    ref={categoriesRef}
  >
    <Typography
      variant={{ xs: 'h4', sm: 'h4', md: 'h2' }}
      component="h4"
      align="center"
      sx={{
        mb: {xs:0, md:4},
        mt: {xs:1, md:0},
        fontFamily: 'system-ui',
        fontWeight: 'normal',
        color: 'text.primary',
        fontSize: { xs: '1.4rem', sm: '1.5rem', md: '2rem' },
        px: { xs: 2, sm: 0, md:0},
      }}
    >
      OUR PRODUCT CATEGORIES
    </Typography>

    <Box
      sx={{
        height: {xs:'30vh', md:'50vh'}, 
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <Grid2 
        container 
        spacing={{xs: 2, sm: 3, md: 8}}
        justifyContent="center"
        alignItems="center"
        sx={{ 
          height: '100%',
          flexWrap: 'nowrap',// Keep items in a single row
          mx:'auto'
        }}
      >
        {productCategories.map((category, index) => (
          <Grid2 
            item
            key={index}
            sx={{ 
              // Responsive width that scales with viewport
              width: {
                xs: '30vw',    // Mobile (0px+)
                sm: '25vw',    // Tablet (600px+)
                md: '50vw',    // Desktop (900px+)
                lg: '15vw'     // Large screens (1200px+)
              },
              // Height matches width to maintain circle
              aspectRatio: '1/1',
              p: {
                xs: 1,
                sm: 1.5,
                md: 0
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.05 }}
              style={{  
                height: '100%',
                width:'100%',
              }}
            >
             <Card
  onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
  sx={{
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: 3,
    '&:hover': {
      boxShadow: 6,
      '& .MuiCardMedia-root': {
        transform: 'scale(1.1)',
      },
      '& .overlay': {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      '& .category-title': {
        transform: 'scale(1.1)',
      }
    }
  }}
>
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.name}
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    // borderRadius:'50%'
                  }}
                />
               <Box
  className="overlay"
  sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: 'rgba(87, 79, 79, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease-in-out'
  }}
>
                  <Typography
                    className="category-title"
                    variant="p"
                    component="p"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontFamily: 'system-ui',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  >
                    {category.name}
                  </Typography>
                  </Box>
                
                
                </Card>
              </motion.div>
              </Grid2>
            ))}
            </Grid2>
          </Box>
      </motion.div>
    </Box>
            
          

          <Box
            component={motion.section}
            id="trending"
            sx={{ 
              py: 8,
              px: 3,
              bgcolor: 'background.paper',
              color: 'text.primary',
              minHeight: { xs: 'auto', sm: 'auto', md: 'auto' },
               width:{ xs: '100vw', sm: '100vw', md: '99vw' },
               mb: { xs: 4, sm: 6, md: 8 } 
          
              // fontWeight: 'bold'
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
             <Divider sx={{flex:1, mb:2}} />
              <Typography
                variant="h3"
                component="h2"
                align="center"
                sx={{
                  mb: 4,
                  fontFamily: 'system-ui',
                  fontWeight: 'normal',
                  Color: 'text.primary',
                  
                }}
              >
                TRENDING NOW
              </Typography>
              <Divider sx={{flex:1, mb:2}} />
            </Box>

              <Stack spacing={4}>
                {Object.entries(trendingProducts).map(([category, products], categoryIndex) => (
                  <Box
                    key={category}
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Typography
                      variant="h4"
                      component="h3"
                      align="center"
                      sx={{
                        mb: 5,
                        fontFamily: 'system-ui',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        Color: 'text.primary'
                      }}
                    >
                      {category}
                    </Typography>

                    <Box sx={{ position: 'relative' }}>
                      <Box
                        ref={el => scrollContainerRefs.current[category] = el}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          gap: 3,
                          pb: 3,
                         
                          overflowX: 'auto',
                          '&::-webkit-scrollbar': { display: 'none' },
                          scrollBehavior: 'smooth',
                          // border:'1px solid red'
                        }}
                      >
                        {products.map((product, index) => (
                          <Box
                            key={product.id}
                            component={motion.div}
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            sx={{  mt:2 }}
                          >
                            <Card
                              onClick={() => handleProductClick(product)}
                              sx={{
                                width: {md:250, xs:180},
                                height: {md:350, xs:250},
                                borderRadius: 2,
                                border:'1px solid rgba(0, 0, 0, 0.05)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
                                  transform: 'translateY(-5px)',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.name}
                                sx={{
                                  height: { md: 200, xs: 150 },
                                  objectFit: 'contain',
                                  p:2,
                                }}
                              />
                              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  noWrap
                                  sx={{ fontWeight: 600, mb: 1 }}
                                >
                                  {product.name}
                                </Typography>
                                <Box sx={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  mt: 'auto',
                                }}>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 'bold', color: 'text.primary' }}
                                  >
                                    Rs {product.price}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <StarIcon sx={{ color: 'warning.main', fontSize: 20, mr: 0.5 }} />
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                      {product.rating}
                                    </Typography>
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </Box>
                        ))}
                      </Box>

                      <IconButton
                        onClick={() => scroll('left', category)}
                        sx={{
                          position: 'absolute',
                          left: -20,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'background.paper',
                          boxShadow: 2,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ChevronLeft />
                      </IconButton>

                      <IconButton
                        onClick={() => scroll('right', category)}
                        sx={{
                          position: 'absolute',
                          right: -20,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'background.paper',
                          boxShadow: 2,
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Stack>
           
  </Box>
  <motion.section
  id="about"
  className="py-12 bg-white"

  >
  <Box 
    sx={{
      width: '100%',
      px: { xs: 2, sm: 4, md: 6 },
      py: { xs: 4, sm: 6, md: 8 },
      backgroundColor: 'background.paper'
    }}
  >
    <Typography
      variant="h3"
      component="h2"
      align="center"
      sx={{
        mb: { xs: 3, sm: 4, md: 6 },
        fontSize: { xs: '1.875rem', sm: '2.25rem', md: '3rem' },
        fontWeight: 'bold',
        fontFamily: 'Playfair Display, serif'
      }}
    >
      About Da-chi
    </Typography>
    
    <Box
      sx={{
        maxWidth: '4xl',
        mx: 'auto',
        textAlign: 'center'
      }}
    >
      <Typography
        sx={{
          mb: 3,
          fontSize: { xs: '1rem', sm: '1.125rem' },
          color: 'text.primary',
          lineHeight: 1.75
        }}
      >
        Da-chi is more than just a cosmetics brand; it's a celebration of individuality and self-expression. 
        Founded with a passion for creating high-quality, innovative products, we strive to enhance your 
        natural beauty and boost your confidence.
      </Typography>
      
      <Typography
        sx={{
          mb: 3,
          fontSize: { xs: '1rem', sm: '1.125rem' },
          color: 'text.primary',
          lineHeight: 1.75
        }}
      >
        Our team of experts works tirelessly to bring you the finest fragrances, nourishing lotions, and 
        effective deodorants. We believe in the power of self-care and the joy it brings to everyday life.
      </Typography>
      
      <Typography
        sx={{
          fontSize: { xs: '1rem', sm: '1.125rem' },
          color: 'text.primary',
          lineHeight: 1.75
        }}
      >
        Join us on this journey of self-discovery and empowerment. With Da-chi, you're not just choosing a 
        product; you're embracing a lifestyle of elegance and confidence.
      </Typography>
    </Box>
  </Box>
</motion.section>
        </main>

        <footer id="footer" className="bg-gray-100 text-gray-800 py-12">
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
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
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
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
                <p className="text-gray-600 mb-2">Email: dachi6825@gmail.com</p>
                <p className="text-gray-600 mb-2">Phone: (+92)313 03494903</p>
                <p className="text-gray-600 mb-2">Phone: (+92)333 2306480</p>
                <p className="text-gray-600">Address: Lahore, Pakistan</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
              <p>&copy; 2024 Da-chi Cosmetics. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </Box>
    </ThemeProvider>
  );
}

