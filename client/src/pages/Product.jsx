import { Add, Remove } from '@material-ui/icons'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { mobile, tablet, small } from '../responsive';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const Container = styled.div``

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${small({ padding: '25px', flexDirection: 'column' })}
`

const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${small({ height: '60vh', width: '50%' })}
    ${mobile({ height: '40vh', width: '90%' })}
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 75%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${tablet({ width: '100%' })}
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 75%;
    ${tablet({ width: '100%' })}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #f8f4f4;
    }
`

const Product = () => {

  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
        try {
            const res = await publicRequest.get('/products/find/' + id);
            setProduct(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    getProduct();
  }, [id]);

  const renderColors = () => product.color?.map(c => 
    (<FilterColor 
        onClick={() => setColor(c)}
        color={c} 
        key={c}
    />)
  );

  const renderSizes = () => product.size?.map(s =>
    (<FilterSizeOption key={s}>{s}</FilterSizeOption>)
);

const handleQuantity = type => {
    if(type==='dec') {
        quantity > 1 &&
        setQuantity(quantity - 1);
    } else {
        setQuantity(quantity + 1);
    }
};

const handleClick = () => {
    dispatch(addProduct({...product, quantity, color, size}));
};
  
  return (
    <Container>
        <Announcement/>
        <Navbar/>

        { product ? 
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>${product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {renderColors()}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {renderSizes()}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity('dec')}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity('inc')}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>Add to Cart</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            : null
        }
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product