import React, { useEffect, useState } from 'react';
import './SalesPage.css';

const SalesPage = ({cart, setCart}) => {
    const [salesProducts, setSalesProducts] = useState([]);
    const serverUrl = 'http://localhost:3333';

    useEffect(() => {
        const fetchSalesProducts = async () => {
            const response = await fetch("http://localhost:3333/products/all");
            const data = await response.json();
            const discountedProducts = data.filter(product => product.discount_price !== null);
            setSalesProducts(discountedProducts);
        };
        fetchSalesProducts();
    }, []);
     

    const addToCart = (product) => {
        let newCart = [...cart];
      
        let productInCart = newCart.find((itemInCart) => itemInCart.id === product.id);
        
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            let productWithFullImageUrl = {...product, image: serverUrl + product.image, quantity: 1}; 
            newCart.push(productWithFullImageUrl);
        }  
      
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    return (
        <div className="sales-container">
            <h1>Discounted items</h1>
            <div className="sales">
              {salesProducts.map(product => (
                 <div key={product.id} className="sale-card">
                 <img src={`http://localhost:3333${product.image}`} alt={product.title} />
                 <h3>{product.title}</h3>
                 <button className='cart-button' onClick={() => addToCart(product)}>Add to Cart</button>
                 <div className="price-container">
                 {product.discont_price && <p className="discont_price">${product.discont_price}</p>}  
        <p className={product.discont_price ? "price discount" : "price"}>${product.price}</p>   
    </div>
             </div>
             
              ))}
            </div>
        </div>
    );
};

export default SalesPage;
