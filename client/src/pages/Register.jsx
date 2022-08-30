import bgPic from '../images/register.jpg';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { mobile, small } from '../responsive';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.5)), url(${bgPic}) center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: rgba(255,255,255,0.7);
    ${small({ width: '60%' })}
    ${mobile({ width: '75%' })}

`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const StyledButton = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`


const Register = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Button 
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute', 
          top: '33px', 
          left: '33px', 
          fontSize: '18px', 
          backgroundColor: 'rgba(255,255,255,0.6)', 
          border: 'none', 
          borderRadius: '0px', 
          fontWeight: '300'
        }} 
        variant="outlined"
      >
        <ArrowBackIosIcon/> Go Back
      </Button>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
            <Input placeholder="Name"/>
            <Input placeholder="Last Name"/>
            <Input placeholder="Username"/>
            <Input placeholder="Email"/>
            <Input placeholder="Password"/>
            <Input placeholder="Confirm Password"/>
            <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
            <StyledButton>CREATE</StyledButton>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
