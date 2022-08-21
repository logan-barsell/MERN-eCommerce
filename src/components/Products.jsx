import React from 'react'
import styled from 'styled-components';
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

const Products = ({title}) => {
  return (
    <>
      <Title>{title}</Title>
      <Container>
        {popularProducts.map((item) => (
          <Product key={item.id} item={item} />
        )
        )}
      </Container>
    </>
  )
}

export default Products
