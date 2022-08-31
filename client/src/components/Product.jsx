import { AddShoppingCartOutlined, FavoriteBorderOutlined, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HoverSelect = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(0,0,0,0.2);
    transition: all 0.5s ease;
    cursor: pointer;
    
`

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 300px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${HoverSelect}{
        opacity: 1;
    }
`

const Image = styled.img`
    height: 75%;
    border-radius: 50%;
`


const Product = ({ item }) => {

  return (
    <Container>
      <Image src={item.img} />
      <Link to={`/product/${item._id}`}>
      <HoverSelect>
      </HoverSelect>
      </Link>
    </Container>
  )
}

export default Product
