import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import { sliderItems } from '../data';
import { mobile, tablet, small } from '../responsive';

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${small({ height: '60vh' })}
    ${tablet({ height: '40vh' })}
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${props => props.slideIndex * -100}vw);
    transition: all 1.5s ease;
`

const Slide = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #${props=> props.bg};
    ${mobile({ backgroundImage: props => `url(${props.img})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', textShadow: '0px 0px 5px rgba(0,0,0,0.4)' })}
`
const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
    ${mobile({ display: "none" })}
`

const Image = styled.img`
    height: 100%;
` 
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;   
    ${small({ flex: 2 })}
    ${mobile({ textAlign: 'center', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)'})}
`
const Title = styled.h1`
    font-size: 70px;
    ${small({ fontSize: '50px' })}
    ${tablet({ fontSize: '35px' })}
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    ${tablet({ margin: '20px 0px' })}
    ${small({ fontSize: '15px' })}
`
const Button = styled.button`
    padding: 17px;
    font-size: 25px;
    background-color: transparent;
    cursor: pointer;
    border-style: double;
    border-color: tomato;
    color: salmon;
    ${tablet({ fontSize: '18px', padding: '13px' })}
    ${small({ fontSize: '20px', padding: '10px' })}
    ${mobile({ borderColor: 'rgb(252 245 245)', backgroundColor: 'rgba(252, 245, 245, 0.2)', color: 'rgb(252 245 245)'})}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
    ${mobile({width: '35px', height: '35px'})}
`

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = direction => {
        if(direction==='left'){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    const clickScroll = (e, el) => {
        console.log(el);
        e.preventDefault();
        const targetEl = document.querySelector(`${el}`);
        console.log(targetEl);
        console.log(document.getElementById('newArrivals'))
        targetEl.scrollIntoView({ behavior: "smooth", block: "center"});
    }
  return (
    <Container>
      <Arrow 
        direction="left"
        onClick={() => handleClick("left")}
      >
        <ArrowLeftOutlined/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map(item => (
            <Slide key={item.id} bg={item.bg} img={item.img}>
                <ImgContainer>
                    <Image src={item.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Desc>{item.desc}</Desc>
                    {item.link.includes("#") ? 
                    <a 
                        href={item.link}
                        onClick={(e) => clickScroll(e, item.link)}
                    >
                        <Button>{item.btn}</Button>
                    </a>
                    :
                    <Link to={item.link}>
                        <Button>{item.btn}</Button>
                    </Link>
                    }
                    
                </InfoContainer>
            </Slide>
        ))}
      </Wrapper>
      <Arrow 
        direction="right"
        onClick={() => handleClick("right")}
      >
        <ArrowRightOutlined/>
      </Arrow>
    </Container>
  )
}

export default Slider
