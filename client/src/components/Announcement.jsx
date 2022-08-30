import styled from "styled-components";
import { Link } from 'react-router-dom';
import {tablet} from '../responsive';

const Container = styled.div`
    height: 30px; 
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`
const Logo = styled.h1`
    font-weight: bold;
    padding: 10px;
    text-align: center;
    ${tablet({ fontSize: '24px' })}
`

const Announcement = () => {
  return (
    <>
      <Container>
          Super Deal! Free Shipping on Orders over $50
      </Container>
      <Link to="/">
          <Logo>myStore</Logo>
      </Link>
    </>
  );
}

export default Announcement
