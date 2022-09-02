import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Product from './Product';

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 20px;
  margin-bottom: 30px;
`

const Title = styled.h1`
  text-align: center;
  margin-top: 30px;
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    width: 80%;
    margin: auto;
    height: 1px;
`

const Products = ({ products, title, cat, filters, sort}) => {
  // const [products, setProducts] = useState([]);
  

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await axios.get( cat ? `/api/products?category=${cat}` : `/api/products/`);
  //       setProducts(res.data);
  //     } catch (err) {
        
  //     }
  //   }
  //   getProducts();
  // }, [cat]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item => 
        Object.entries(filters).every(([key, value]) =>
          value === "All" ?
          true
          :
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
      {window.location.pathname !== '/' && <Hr/>}
      <Container>
        {cat ? filteredProducts.map((item) => (
          <Product key={item._id} item={item} />
        )) : products.slice(0, 4).map((item) => (
          <Product key={item._id} item={item} />
        ))
        }
        {!products.length && <h1 style={{width: '100%', textAlign: 'center', margin: '100px 0px'}}>NO PRODUCTS FOUND</h1>}
      </Container>
    </>
  );
};

export default Products;
