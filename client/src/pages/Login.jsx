import bgPic from '../images/login.jpg';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mobile, small } from '../responsive';
import { login } from '../redux/apiCalls';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useEffect } from 'react';

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
    width: 25%;
    background-color: rgba(255,255,255,0.7);
    ${small({ width: '50%' })}
    ${mobile({ width: '75%' })}

`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`

const StyledButton = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: rgb(0, 128, 128);
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
      background-color: rgba(0, 128, 128, 0.8)
    }
`

const StyledLink = styled.a`
    font-size: 12px;
    margin: 5px 0px;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
  color: red;
`



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let {isFetching, error} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  
  useEffect(() => {
  
  }, []);

  

  return (
    <Container>
      <Button 
        onClick={() => navigate('/')}
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
        <Title>SIGN IN</Title>
        <Form>
            <Input 
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}/>
            <Input 
              type="password"
              placeholder="Password" 
              required
              onChange={(e) => setPassword(e.target.value)}/>
            <StyledButton onClick={handleLogin} disabled={isFetching}>LOG IN</StyledButton>
            {error && <Error>Something went wrong!</Error>}
            <Link to="/register">
              <StyledLink type="submit">CREATE A NEW ACCOUNT</StyledLink>
            </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
