import React, { useState } from 'react';
import './cart.css';
import { toast } from 'react-toastify';


const Cart = ({ cart, setCart }) => {
  const [form, setForm] = useState({ firstname: '', lastname: '', phone: '' });

  const handleMinus = (index) => {
    let newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const handlePlus = (index) => {
    let newCart = [...cart];
    newCart[index].quantity++;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItemAtCart = (indexToRemove) => {
    const filteredCart = cart.filter((_, index) => index !== indexToRemove);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    setCart(filteredCart);
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + (item.discont_price ? item.discont_price : item.price) * item.quantity, 0);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const orderData = {
      name: form.firstname,
      lastName: form.lastname,
      phone: form.phone,
      cart
    };

    fetch('http://localhost:3333/order/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      toast(
        <div>
          <h2>Congratulations!</h2>
          <p>Your order has been successfully placed on the website. A manager will contact you shortly to confirm your order.</p>
        </div>,
        {position: "center",
        autoClose: 300,
        pauseOnHover: false,
        draggable: true,
        className: 'Toastify__toast--success' }
      );

      setCart([]); 
      localStorage.removeItem('cart');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="items-container">
          {cart.map((item, index) => (
            <div key={index} className="cartProduct">
              <img src={item.image} alt={item.title} />
              <div className="productInfo">
                <div><h3>{item.title}</h3></div>
                <div className="counterAndPrice">
                  <div className="counterBox">
                    <button onClick={() => handleMinus(index)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handlePlus(index)}>+</button>
                  </div>
                  <p className="itemPrice">{item.price}</p>
                  <button className="removeBtn" onClick={() => removeItemAtCart(index)}>X</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-form-container">
          <h2>Order details</h2>
          <form onSubmit={handleFormSubmit}>
              <div><p className="total-text">Total: <span className="total-amount">${getTotalCost()}</span></p></div>
              <div className="input-wrap">
                <div><input type="text" name="first-name" placeholder="First Name" value={form.firstname} onChange={e => setForm({...form, firstname: e.target.value})} /></div>
                <div><input type="text" name="last-name" placeholder="Last Name" value={form.lastname} onChange={e => setForm({...form, lastname: e.target.value})} /></div>
                <div><input type="text" name="phone-number" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                <div><input type="submit" value="Submit Order" className="submit-button" /></div>
              </div>
           </form>
         </div>
      </div>
    </div>
  );
  
};

export default Cart;