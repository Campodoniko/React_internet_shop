import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AllProductPage.css';
import './SalesPage.css';

const Productspage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMethod, setSortMethod] = useState("default");
  const [minSearchPrice, setMinSearchPrice] = useState("");
  const [maxSearchPrice, setMaxSearchPrice] = useState("");
  const serverUrl = 'http://localhost:3333';

  useEffect(() => {
    fetch(serverUrl + '/products/all')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const addToCart = (product) => {
    let newCart = [ ...cart ];
    let itemInCart = newCart.find((itemInCart) => itemInCart.id === product.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      let itemWithFullImageUrl = { ...product, image: serverUrl + product.image, quantity: 1 };
      newCart.push(itemWithFullImageUrl);
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const sortProducts = (products) => {
    let sortedProducts;
    switch (sortMethod) {
      case 'priceAsc':
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = products;
    }
    return sortedProducts;
  }

  const productsPerPage = 12;
  let productsToShow = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
 
  if (minSearchPrice || maxSearchPrice) {
    productsToShow = productsToShow.filter(product => {
        const price = product.price;
        if (minSearchPrice && price < minSearchPrice) return false;
        if (maxSearchPrice && price > maxSearchPrice) return false;
        return true;
    });
  }

  const sortedProducts = sortProducts(productsToShow);
 
  return (
    <div className='products-page'>
      <h1 className='title'>All Products</h1>
      
      <div className="sort-panel">
        <label>Sort by: </label>
        <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
          <option value="default">Default</option>
          <option value="priceAsc">Price (Lowest to Highest)</option>
          <option value="priceDesc">Price (Highest to Lowest)</option>
        </select>
        
        <h3 className='price-filter-label'>Price</h3>
        <input
          className='price-filter-input'
          type="number"
          placeholder="Min Price"
          value={minSearchPrice}
          onChange={(e) => setMinSearchPrice(e.target.value)}
        />
        <input
          className='price-filter-input'
          type="number"
          placeholder="Max Price"
          value={maxSearchPrice}
          onChange={(e) => setMaxSearchPrice(e.target.value)}
        />
      </div>
      
      <div className='products-container'>
      {sortedProducts.map((product) => (
       <div key={product.id} className='product-card'>
          <img src={serverUrl + product.image} alt={product.title} />
          <h3><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
          <button className='cart-button' onClick={() => addToCart(product)}>Add to Cart</button>
          <div className="price-container">
            {product.discount_price && <p className="discount_price">$ {product.discount_price}</p>}
            <p className={product.discount_price ? "price discount" : "price"}>$ {product.price}</p>
          </div>
        </div>
      ))}
      </div>
      
      <div className='pagination'>
        <button className='page-button' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <button className='page-button' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(products.length / productsPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default Productspage;