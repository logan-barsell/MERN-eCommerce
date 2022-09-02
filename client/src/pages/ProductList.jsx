import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Products from '../components/Products';
import { small } from '../responsive';

const Container = styled.div``

const Title = styled.h1`
  margin: 20px;
  text-align: center;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const Filter = styled.div`
  margin: 20px;
  ${small({ margin: '0px 20px', display: 'flex', flexDirection: 'column' })}
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${small({ margin: '0px 0px 10px 0px', fontSize: '17px' })}
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  color: black;
  ${small({ margin: '5px 0px', padding: '7px' })}
`
const Option = styled.option`
  color: black;
`

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`/api/products?category=${cat}`);
        setProducts(res.data);
      } catch (err) {
        
      }
    }
    getProducts();
  }, [cat]);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    });
  };

  const [colors, setColors] = useState([]);
  useEffect(() => {
    const availableColors = [];
    products.map(product => {
      return product.color.map(c => {
        if(!availableColors.includes(c)) {
          availableColors.push(c);
        }
      });
    });
    setColors(availableColors);
  }, [colors]);

  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    const availableSizes = [];
    products.map(product => {
      return product.size.map(s => {
        if(!availableSizes.includes(s)) {
          availableSizes.push(s);
        }
      });
    });
    setSizes(availableSizes);
  }, [sizes]);
  

  return (
    <Container>
      <Announcement/>
      <Navbar/>
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>
            Filter Products:
          </FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option value='All'>All Colors</Option>
            {colors.map(c => <Option value={c}>{c[0].toUpperCase() + c.substring(1)}</Option>)}
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option value='All'>All Sizes</Option>
            {sizes.map(s => <Option value={s}>{s}</Option>)}
          </Select>
        </Filter>
        <Filter>
          <FilterText>
              Sort Products:
          </FilterText>
          <Select onChange={e => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products products={products} cat={cat} filters={filters} sort={sort} />
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default ProductList
