import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = ({ cart, setCart }) => {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const serverUrl = 'http://localhost:3333';

    useEffect(() => {
        axios.get(`http://localhost:3333/products/${id}`)
        .then(res => {
            setProduct(res.data[0])
        })
        .catch(err => console.log(err));
    }, [id]);

    const addToCart = (product) => {
        let newCart = [...cart];
      
        let productInCart = newCart.find(cartProduct => cartProduct.id === product.id);
        
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
        <div className="product-container">
            <img src={serverUrl + product.image} alt={product.title} className="product-image" />
            <div>
                <h1>{product.title}</h1>
                <div className="price-container">
            {product.discont_price && <p className="discont_price">${product.discont_price}</p>}  
        <p className={product.discont_price ? "price discount" : "price"}>${product.price}</p>
    </div>

                <button className="add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button> 
                <p className="font-description">{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
