import { Facebook, Instagram, Mail, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile, tablet, small } from '../responsive'

const Container = styled.div`
    display: flex;
    ${tablet({ flexDirection: 'column'})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1`
    font-variant: small-caps;
`;
const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;

`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${small({ display: 'none' })};
`

const Title = styled.h3`
    margin-bottom: 30px;
    text-align: ${props=>props.type === 'links' && 'center'};
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    text-align: center;
`

const ListItem = styled.li`
    /* width: 50%; */
    margin-bottom: 10px;
`

const Right = styled.div`
    flex: 0.5;
    padding: 20px;
    ${mobile({ backgroundColor: '#fff8f8' })}
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>indiLuv</Logo>
        <Desc>
            Hello there! We are a small independant retail business specializing in unique vintage and indie-style womens clothing. Think of us like an online thrift store! We carry all sorts of clothing and accessories, so you can find whatever you need to make you feel like you. Enjoy your shopping, and thanks for choosing <b style={{fontVariant: 'small-caps', fontSize: '22px'}}>indiLuv</b>!
        </Desc>
        <SocialContainer>
            <SocialIcon color="3B5999">
                <Facebook/>
            </SocialIcon>
            <SocialIcon color="E4405F">
                <Instagram/>
            </SocialIcon>
            <SocialIcon color="55ACEE">
                <Twitter/>
            </SocialIcon>
            <SocialIcon color="E60023">
                <Pinterest/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title type="links">Links</Title>
        <List>
            <Link to="/">
                <ListItem>Home</ListItem>
            </Link>
            <Link to="/products/T-Shirts">
                <ListItem>T-Shirts</ListItem>
            </Link>
            <Link to="/products/Sweaters">
                <ListItem>Sweaters</ListItem>
            </Link>
            <Link to="/products/Accessories">
                <ListItem>Accessories</ListItem>
            </Link>
            <Link to="/cart">
                <ListItem>My Cart</ListItem>
            </Link>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
            <Room style={{ marginRight: "10px"}}/> East San Francisco Bay Area, CA
        </ContactItem>
        <ContactItem>
            <Phone style={{ marginRight: "10px"}}/> +1 (925)262-7761
        </ContactItem>
        <ContactItem>
            <Mail style={{ marginRight: "10px"}}/> contact@loganbarsell.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
      </Right>
    </Container>
  )
}

export default Footer
