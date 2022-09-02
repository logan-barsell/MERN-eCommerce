import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import Slider from '../components/Slider';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`/api/products/`);
        setProducts(res.data);
      } catch (err) {
        
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      <Announcement/>
      <Navbar/>
      <Slider />
      <div id="categories">
        <Categories />
      </div>
      <div id="newArrivals">
        <Products title="New Arrivals" products={products}/>
      </div>
      <Newsletter/>
      <Footer />
    </div>
  )
}

export default Home

