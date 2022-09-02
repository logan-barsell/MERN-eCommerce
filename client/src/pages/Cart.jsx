import heart from '../images/heart.jpg'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Button from '@material-ui/core/Button';
import { Add, Remove } from '@material-ui/icons';
import { mobile, tablet, small } from '../responsive';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';
import { changeProductQuantity, removeProduct } from '../redux/cartRedux';

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``

const Wrapper = styled.div`
    padding: 30px;
    ${mobile({ padding: '30px 10px' })}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type=== 'filled' && 'none'};
    background-color: ${props=>props.type=== 'filled' ? 'black' : 'transparent'};
    color: ${props=>props.type === 'filled' ? 'white' : 'black'};
`

const TopTexts = styled.div`
${tablet({ display: 'none' })}
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 50px 0px;
    ${small({ flexDirection: 'column' })}
`

const Info = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 33px 0px;
    flex: 3;
    justify-content: center;
    ${small({ flex: 2 })}
`

const Product = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 75px;
    justify-content: space-between;
    ${tablet({ flexDirection: 'column' })}
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    justify-content: start;
    ${tablet({justifyContent: 'center'})}
`

const Image = styled.img`
    width: 150px;
    margin-right: 20px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${small({ padding: '20px 0px' })}

`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid darkgrey;
    background-color: ${props=> props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${tablet({marginTop: '33px'})}
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin: 5px;
    ${tablet({ margin: '5px 15px' })}
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 20;
    margin-bottom: 20px;
    /* ${tablet({ marginBottom: '20px' })} */
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgrey;
    border-radius: 10px;
    padding: 33px;
    height: 33vh;
    align-self: center;
    ${small({ width: '50%' })}
    ${tablet({ width: '80%' })}
    `

const SummaryTitle = styled.div`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === "total" && "500"};
    font-size: ${props=> props.type === "total" && "24px"};
`
const SummaryItemText = styled.div`
    font-weight: 600;
`

const SummaryItemPrice = styled.div``
const ButtonStyled = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`
const EmptyCart = styled.h2`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Cart = () => {

  const cart = useSelector(state => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = cart.total > 50 ? cart.total - 5 : cart.total;

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
        try {
            const res = await userRequest.post('/checkout/payment', {
                tokenId: stripeToken.id,
                amount: 500,
            });
            console.log(res);
            navigate('/success', {
                state: {
                    stripeData: res.data,
                    products: cart
                },
            });
        } catch (err) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const removeItem = product => {
    dispatch(removeProduct(product));
  };

  const changeQuantity = (product, add) => {
    if(add) {
        dispatch(changeProductQuantity({id: product.cartId, quantity: product.quantity + 1}));
    } else if(!add && product.quantity > 1) {
        dispatch(changeProductQuantity({id: product.cartId, quantity: product.quantity - 1}));
    }
  };
  
  return (
    <Container>
      <Announcement/>
      <Navbar/>
        <Wrapper>
            <Title>YOUR ITEMS</Title>
            <Top>
                <TopButton onClick={() => navigate(-1)}>CONTINUE SHOPPING</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.length ? cart.products.map(product => (
                        <Product>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName>{product.title}</ProductName>
                                    <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                    <div style={{display: 'flex'}}>
                                        <b>Color:&nbsp; </b><ProductColor color={product.color}/>
                                    </div>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Remove 
                                        onClick={() => changeQuantity(product, 0)}
                                        style={{cursor: 'pointer'}}
                                    />
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Add 
                                        onClick={() => changeQuantity(product, 1)}
                                        style={{cursor: 'pointer'}}
                                    />
                                </ProductAmountContainer>
                                <ProductPrice>${product.price * product.quantity}</ProductPrice>
                                <Button onClick={() => removeItem(product)}variant="contained" color="secondary">
                                    Remove Item
                                </Button>
                            </PriceDetail>
                        </Product>
                    ))
                    :
                    <EmptyCart>Your Cart is Empty</EmptyCart>
                    } 
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$5.00</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Discount</SummaryItemText>
                        <SummaryItemPrice>-${cart.total > 50 ? '5.00' : '0.00'}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText >Total</SummaryItemText>
                        <SummaryItemPrice>${totalPrice}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout
                        name="indiLuv"
                        image={heart}
                        billingAddress
                        shippingAddress
                        description={`Your total is $${totalPrice}`}
                        amount={totalPrice * 100}
                        token={onToken}
                        stripeKey={KEY}
                        disabled={!cart.total}
                    >
                        <ButtonStyled>CHECKOUT</ButtonStyled>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Cart
