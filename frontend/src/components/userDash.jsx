import React from 'react';
import { MdLogout } from 'react-icons/md';
import { IoPricetagsSharp } from "react-icons/io5";
import pic1 from '../assets/pic1.jpg';
import Bombottle from '../assets/Bombottle.png';
import Bossbottle from '../assets/Bossbottle.jpg';
import creed from '../assets/creed.png';
import dvdbottle from '../assets/dvdbottle.png';
import lemonbottle from '../assets/lemonbottle.png';
import peechbottle from '../assets/peechbottle.png';
import Slider from 'react-slick';
import Typing from 'react-typing-effect';
import { IoSearchSharp } from "react-icons/io5";

const deodorantImages = [pic1, Bombottle, Bossbottle, creed, dvdbottle, lemonbottle, peechbottle];

function UserDashboard() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const products = [
    { name: 'Bomber', originalPrice: '350 Rs', discountedPrice: '300 Rs', review: '★★★★☆', description: 'A great deodorant.', image: Bombottle },
    { name: 'Boss Deo', originalPrice: '150 Rs', discountedPrice: '120 Rs', review: '★★★☆☆', description: 'Effective and affordable.', image: Bossbottle },
    { name: 'Creeders', originalPrice: '240 Rs', discountedPrice: '200 Rs', review: '★★★★★', description: 'High-quality deodorant.', image: creed },
    { name: 'DVD Deo', originalPrice: '240 Rs', discountedPrice: '220 Rs', review: '★★★★☆', description: 'Long-lasting fragrance.', image: dvdbottle },
    { name: 'lemonade', originalPrice: '240 Rs', discountedPrice: '210 Rs', review: '★★★☆☆', description: 'Great value for money.', image: lemonbottle },
    { name: 'Peach Gala', originalPrice: '240 Rs', discountedPrice: '220 Rs', review: '★★★★★', description: 'Excellent deodorant.', image: peechbottle },
  ];

  return (
    <>
      <header className="header">
        <img src={pic1} alt="Logo" className="logo" />
        <h1 className="logo-text">DA-CHI</h1>
        <button className="logout-button">
          <MdLogout size={24} />
          <span>Logout</span>
        </button>
        <div className="box">
          <IoSearchSharp />
          <input type="text" placeholder='Search your deodorant'/>
          <a href="#">
            <i className='fas fa-search'></i>
          </a>
        </div>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <h1><Typing text={['Da-chi Cosmetics']} speed={100} typingDelay={500} /></h1>
          <hr />
        </section>

        <section className="slider-section">
          <Slider {...sliderSettings}>
            {deodorantImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Slide ${index}`} className="slider-image" />
              </div>
            ))}
          </Slider>
        </section>

        <section className="products-section">
          <h2>Our Products</h2>
          <div className="products">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
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

