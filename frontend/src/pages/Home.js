
import { Link } from 'react-router-dom';
import HeadImage from '../assets/head.jpg'
import discount_image from '../assets/discount_image.png'
import './Home.css'
import './SalesPage.css';
import React, { useEffect, useState } from "react";

const Home = () => {

    const [categories, setCategories] = useState(null);
    const [salesProducts, setSalesProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3333/categories/all");
            const data = await response.json();
            setCategories(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchSalesProducts = async () => {
            const response = await fetch("http://localhost:3333/products/all");
            const data = await response.json();
            const discountedProducts = data.filter(product => product.discont_price !== null);
            setSalesProducts(discountedProducts.slice(0, 4));
        };
        fetchSalesProducts();
    }, []);

    const scrollToSales = () => {
        document.querySelector('.sales_container').scrollIntoView({ 
          behavior: 'smooth' 
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        const response = await fetch('http://localhost:3333/sale/send', {
            method: 'POST',
            body: data
        });
        const result = await response.json();
        alert(result.message);
    };
    return (
      <>
        <div className="head" style={{position: 'relative', height: '600px', width: '100%', backgroundImage: `url(${HeadImage})`, backgroundSize: 'cover'}}>
            <h1 style={{position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '96px'}}>Amazing Discounts <br/>on Garden Products!</h1>
            <button style={{position: 'absolute', bottom: '180px', left: '9%', transform: 'translateX(-50%)', width: '218px', height: '58px', backgroundColor: '#339933', border: 'none', borderRadius: '10px', color: 'white', fontSize: '16px', cursor: 'pointer'}} onClick={scrollToSales}>Check out</button>
        </div>    
        
        <div className="categories">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '45px', paddingLeft: '20px'} }>
                <h1>Categories</h1>
                <Link to="/categories" style={{width: '142px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #DDDDDD', borderRadius: '10px', textDecoration: 'none', color: '#DDDDDD'}}>
                    All Categories
                </Link>
            </div>
            <div className="categories-container">
                {categories && categories.map((category, index) => (
                    <div className="category-item" key={index}>
                        <p>{category.title}</p>
                        <img className="category-image" src={`http://localhost:3333${category.image}`} alt={category.title} />
                    </div>
                ))}
            </div>
        </div>

        <div className="discount-form">
            <h1 className="discount-heading">5% off on the first order</h1>
            <div className='discount-image'>
                <img src={discount_image} alt="discount_image" />
            </div>
            <div className="registration-form">
                <form onSubmit={submitForm}>
                    <input type="text" name="name" placeholder='Имя' required />
                    <input type="tel" name="phone" placeholder='Номер телефона' required />
                    <input type="email" name="email" placeholder='Почта' required />
                    <input type="submit" value="Получить скидку" className="submit-btn" />
                </form>
            </div>
        </div>


        <div className='sales_container'>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '45px', paddingLeft: '20px'} }>
                <h1>Sales</h1>
                <Link to="/sales" style={{width: '142px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #DDDDDD', borderRadius: '10px', textDecoration: 'none', color: '#DDDDDD'}}>
                    All Sales
                </Link>
        </div>
            <div className="sale">
                {salesProducts.map(product => (
                    <div key={product.id} className="sale-card">
                        <img src={`http://localhost:3333${product.image}`} alt={product.title} />
                        <h3>{product.title}</h3>
                        <div className="price-container">
                        {product.discont_price && <p className="discont_price">${product.discont_price}</p>}  
        <p className={product.discont_price ? "price discount" : "price"}>${product.price}</p>
    </div>
                    </div>
                ))}
            </div>
        </div>
      </>
    );
};

export default Home;
