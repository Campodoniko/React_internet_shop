import React, { useEffect, useState } from 'react';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState(null);
  const serverURL = 'http://localhost:3333';

  useEffect(() => {
    fetch(serverURL + '/categories/all')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    <h1 className="title">Categories</h1>
      <div className="categories-container">
          {categories &&
            categories.map((category, index) => (
              <div className="category-item" key={index}>
                <img 
                    src={serverURL + category.image} 
                    alt={category.title} 
                />
                <div>{category.title}</div>
              </div>
          ))}
      </div>
      </>
  );
};

export default CategoriesPage;