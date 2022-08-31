import { Badge, Menu, MenuItem, Button } from '@material-ui/core';
import { ShoppingCartOutlined , DragHandle, HomeOutlined} from '@material-ui/icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../redux/userRedux';
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
`

const Input = styled.input`
    border: none;
    ${tablet({ width: '100px' })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2 })}
`

const MenuItemStyled = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${small({ marginLeft: '10px' })}
    ${tablet({ fontSize: '12px' })}
`
const Welcome = styled.b`
    ${mobile({ display: 'none'})}
`

const Navbar = () => {
  const user = useSelector(state => state.user.currentUser);
  const quantity = useSelector(state => state.cart.quantity);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log('logout')
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
        <Wrapper>
            <Left>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <DragHandle/>
                    MENU
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    style={{backgroundColor: 'rgb(0,0,0, 0.3)', color: 'rgba(0, 0, 0, 0.8)', fontWeight: '300'}}
                >
                    <Link to="/">
                        <MenuItem onClick={handleClose}>
                                <HomeOutlined/>&nbsp;Home
                        </MenuItem>
                    </Link>
                    <Link to="/products/T-Shirts">
                        <MenuItem onClick={handleClose}>
                                T-Shirts
                        </MenuItem>
                    </Link>
                    <Link to="/products/Sweaters">
                        <MenuItem onClick={handleClose}>
                                Sweaters
                        </MenuItem>
                    </Link>
                    <Link to="/products/Accessories">
                        <MenuItem onClick={handleClose}>
                                Accessories
                        </MenuItem>
                    </Link>
                    <Link to="/cart">
                        <MenuItem onClick={handleClose}>
                        <ShoppingCartOutlined/>&nbsp;My Cart
                        </MenuItem>
                    </Link>
                </Menu>
            </Left>
            <Right>
                {
                    user ?
                    <>
                        <Welcome>Welcome, {user.firstName}!</Welcome>
                        <MenuItemStyled onClick={handleLogout}>Log Out</MenuItemStyled>
                    </>
                    :
                    <>
                        <Link to="/register">
                            <MenuItemStyled>REGISTER</MenuItemStyled>
                        </Link>
                        <Link to="/login">
                            <MenuItemStyled>SIGN IN</MenuItemStyled>
                        </Link>
                    </>
                }
                <Link to="/cart">
                    <MenuItemStyled>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItemStyled>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar
