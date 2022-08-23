import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Product from './Product';
import { popularProducts } from '../data';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
`

const Title = styled.h1`
  text-align: center;
  margin-top: 30px;
`

const Products = ({title, cat, filters, sort}) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get( cat ? `http://localhost:5000/api/products?category=${cat}` : 'http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        
      }
    }
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => 
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [products, cat, filters]);

  useEffect(() => {
    if(sort === 'newest') {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <Title>{title}</Title>
      <Container>
        {cat ? filteredProducts.map((item) => (
          <Product key={item._id} item={item} />
        )) : products.slice(0, 4).map((item) => (
          <Product key={item._id} item={item} />
        ))
        }
      </Container>
    </>
  )
}

export default Products
