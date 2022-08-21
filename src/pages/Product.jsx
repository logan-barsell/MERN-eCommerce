import { Add, Remove } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import product1 from '../images/product1.jpg';
import { mobile, tablet, small } from '../responsive'

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
  return (
    <Container>
        <Announcement/>
        <Navbar/>

        <Wrapper>
            <ImgContainer>
                <Image src={product1}/>
            </ImgContainer>
            <InfoContainer>
                <Title>Cool Sweater</Title>
                <Desc>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, inventore voluptas consequatur quo eaque omnis eius rem officiis ea molestiae a numquam ex recusandae dignissimos assumenda. Commodi vel aliquam officia.</Desc>
                <Price>$20</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        <FilterColor color="black"/>
                        <FilterColor color="darkblue"/>
                        <FilterColor color="grey"/>
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize>
                            <FilterSizeOption>XS</FilterSizeOption>
                            <FilterSizeOption>S</FilterSizeOption>
                            <FilterSizeOption>M</FilterSizeOption>
                            <FilterSizeOption>L</FilterSizeOption>
                            <FilterSizeOption>XL</FilterSizeOption>
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove/>
                        <Amount>1</Amount>
                        <Add/>
                    </AmountContainer>
                    <Button>Add to Cart</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>

        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product
