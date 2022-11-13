import React, { useContext } from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

import CartContext from "../../context/cartContext";
import Button from "../UI/Button";

const Container = styled.div`
  background-color: #f2f2f2;
`;

const Image = styled.img`
  height: 16rem;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.gap};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: #333;
  letter-spacing: 1.6;
`;

const Price = styled.p`
  font-size: 2rem;
  color: #333;
  font-weight: 500;
`;

const Product = (props) => {
  const cartContext = useContext(CartContext);

  const addToCartHandler = (e) => {
    e.preventDefault();

    cartContext.addProduct({
      id: props.id,
      title: props.title,
      quantity: 1,
      smallImageUrl: props.smallImageUrl,
      price: +props.price,
    });
  };

  const removeFromCartHandler = (e) => {
    e.preventDefault();

    cartContext.removeProduct({
      id: props.id,
    });
  };

  return (
    <Container>
      <Image src={props.bigImageUrl} />
      <ContentBox>
        <Flex>
          <Title>{props.title}</Title>
          <Price>{`$${props.price}`}</Price>
        </Flex>
        <Description>
          A computer is a machine or device that performs processes,
          calculations and operations based on instructions provided.
        </Description>
        <Flex>
          <Button onClick={addToCartHandler}>Buy Product</Button>
          <Flex gap="1rem">
            <Button onClick={addToCartHandler}>
              <FaPlus />
            </Button>
            <Button onClick={removeFromCartHandler}>
              <FaMinus />
            </Button>
          </Flex>
        </Flex>
      </ContentBox>
    </Container>
  );
};

export default Product;
