import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import logo from '../assets/logo (1).png'
import cart_icon from '../assets/basket_empty.png'

const Header = ({ cart }) => {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
        <img src={logo} alt='logo' />
        </Link> 
      </div>
      
      <nav className="links">
        <ul>
          <li><Link to="/">Main Page</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/products">All Products</Link></li>
          <li><Link to="/sales">All sales</Link></li>
        </ul>      
      </nav>
      <div className="cart_icon">
        <Link to="/cart">
          <img src={cart_icon} alt="basket_empty"/>
          {itemCount > 0 && 
             <div className="item-count">
               {itemCount}
             </div>
          }
        </Link>
      </div>
    </header>
  );
};

export default Header;
