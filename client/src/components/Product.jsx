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
    margin: 5px;
    width: 100%;
    height: 307px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    flex-direction: column;
    &:hover ${HoverSelect}{
        opacity: 1;
    }
`

const Image = styled.img`
    height: 75%;
    border-radius: 3px;
`

const Name = styled.div`
    margin-top: 13px;
    font-size: 20px;
`

const Cost = styled.span`
  margin-left: 9px;
  font-weight: 800;
  color: teal;
`


const Product = ({ item }) => {

  return (
    <Container>
      <Image src={item.img} />
      <Name>
        {item.title}
        <Cost>{item.price}</Cost>
      </Name>
      <Link to={`/product/${item._id}`}>
      <HoverSelect>
      </HoverSelect>
      </Link>
    </Container>
  )
}

export default Product
