import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './pages/userDash.jsx';
import ProductCardPage from './pages/product-card-page.jsx'; // Your ProductCardPage component
import './index.css'; 
import CartPage from './pages/cart-page.tsx';
import { CartProvider } from './contexts/CartContext';
import PerfumePage from './pages/PerfumePage.tsx'
import LotionCardPage from './pages/lotion-page.tsx'
import DeodorantPage from './pages/DeodorantPage.tsx'

function App() {
  return (
    <CartProvider>
    <Router>
    <div className="App">
 
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/product" element={<ProductCardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="category/Perfumes" element={<PerfumePage />} />
        <Route path="category/Lotions" element={<LotionCardPage />} />
        <Route path="category/deodorants" element={<DeodorantPage />} />
      </Routes>
      
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
