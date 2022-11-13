import React, { useContext } from "react";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

import CartContext from "../../context/cartContext";

const Container = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  padding: 1rem;
`;

const Image = styled.img`
  height: 6rem;
  width: 10rem;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: ${(props) => props.flexDirection};
  gap: 1rem;
`;

const Title = styled.p`
  font-size: 1.8rem;
  color: #333;
  font-weight: 600;
`;

const Price = styled.p`
  font-size: 1.7rem;
  color: #333;
  font-weight: 500;
`;

const CartItem = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = props.price * props.quantity;
  const price = +props.price;

  const deleteFromCartHandler = (e) => {
    e.preventDefault();

    cartContext.deleteProduct({
      id: props.id,
    });
  };

  return (
    <Container>
      <Flex>
        <Image src={props.imageUrl} />
        <Flex flexDirection="column" justifyContent="center">
          <Flex alignItems="center" justifyContent="space-between">
            <Title>{props.title}</Title>
            <GrClose
              onClick={deleteFromCartHandler}
              style={{
                fontSize: "1.6rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            />
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Price>${totalAmount}</Price>
            <Price>
              ${price} × {props.quantity}
            </Price>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default CartItem;
