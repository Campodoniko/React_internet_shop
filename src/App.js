import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import CategoriesPage from './pages/CategoriesPage';
import SalesPage from './pages/SalesPage';
import Footer from './components/Footer';
import ProductsPage from './pages/AllProductsPage'
import Cart from './pages/cart';
import ProductDetail from './pages/ProductDetail'; 

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems) {
        setCart(cartItems);
    }
  }, []);

  return (
    <Router>
      <Header cart={cart} />
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/sales" element={<SalesPage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
        <Route path='/products' element={<ProductsPage cart={cart} setCart={setCart} />} />
        <Route path="/products/:id" element={<ProductDetail cart={cart} setCart={setCart} />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
