import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {mobile, tablet, small } from '../responsive';

const Container = styled.div`
    height: 60px;
    ${tablet({height: '50px'})}
`

const Wrapper = styled.div`
    padding: 10px 20px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    ${mobile({ display: 'none' })}
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${tablet({display: "none"})}
`

const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${tablet({ marginLeft: '0px'})}
`
const Input = styled.input`
    border: none;
    ${tablet({ width: '100px' })}
`

const Center = styled.div`
    flex: 0.5;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    padding-left: 7px;
    ${tablet({ fontSize: '24px' })}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2 })}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${small({ marginLeft: '10px' })}
    ${tablet({ fontSize: '12px' })}
`

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity);

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder='Search'/>
                    <Search style={{color:"grey", fontSize:16}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Logo>myStore</Logo>
            </Center>
            <Right>
                <MenuItem>REGISTER</MenuItem>
                <MenuItem>SIGN IN</MenuItem>
                <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar
