import React from 'react';
import { MdLogout } from 'react-icons/md'; // Import the logout icon
import { IoPricetagsSharp } from "react-icons/io5"; // Import the price tag icon
import pic1 from '../assets/pic1.jpg'; // Correct path to the image
import pic2 from '../assets/pic2.jpg'; // Correct path to the image
import Slider from 'react-slick'; // Import react-slick for the slider
import Typing from 'react-typing-effect'; // Import react-typing-effect for typewriter effect

const deodorantImages = [
  pic1,
  pic2,
];

function UserDashboard() {
  // Settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds for each slide
  };

  return (
    <>
      <header className="header">
        <img src={pic1} alt="Logo" className="logo" />
        <h1 className="logo-text">
          DA-CHI
        </h1>
        <button className="logout-button">
          <MdLogout size={24} />
          <span>Logout</span>
        </button>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <h1><Typing text={['Da-chi Cosmetics']} speed={100} typingDelay={500} /></h1>
          <hr />
        </section>

        <section className="slider-section">
          <Slider {...sliderSettings}>
            {deodorantImages.map((img, index) => (
              <div key={index} className="slide">
                <img src={img} alt={`Deodorant ${index + 1}`} className="slider-image" />
              </div>
            ))}
          </Slider>
        </section>

        <section className="products-section">
          <h2>Our Products</h2>
          <div className="products">
            {[
              { name: 'Product 1', originalPrice: '350 Rs', discountedPrice: '300 Rs', review: '★★★★☆', description: 'A great deodorant.' },
              { name: 'Product 2', originalPrice: '150 Rs', discountedPrice: '120 Rs', review: '★★★☆☆', description: 'Effective and affordable.' },
              { name: 'Product 3', originalPrice: '240 Rs', discountedPrice: '200 Rs', review: '★★★★★', description: 'High-quality deodorant.' },
              { name: 'Product 4', originalPrice: '240 Rs', discountedPrice: '220 Rs', review: '★★★★☆', description: 'Long-lasting fragrance.' },
              { name: 'Product 5', originalPrice: '240 Rs', discountedPrice: '210 Rs', review: '★★★☆☆', description: 'Great value for money.' },
              { name: 'Product 6', originalPrice: '240 Rs', discountedPrice: '220 Rs', review: '★★★★★', description: 'Excellent deodorant.' },
            ].map((product, index) => (
              <div key={index} className="product-card">
                <img src={pic2} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <div className="product-price-container">
                    <p className="product-price">{product.originalPrice}</p>
                    <p className="product-discounted-price">
                      <IoPricetagsSharp style={{ marginRight: '5px' }} />
                      {product.discountedPrice}
                    </p>
                  </div>
                  <p className="product-review">{product.review}</p>
                  <p className="product-description">{product.description}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Contact: +92-3130494909 <span>Email: afanabhai@gmail.com</span></p>
        <p>&copy; 2024 Da-chi. All rights reserved</p>
      </footer>
    </>
  );
}

export default UserDashboard;
