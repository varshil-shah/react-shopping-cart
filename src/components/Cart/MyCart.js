import React, { useContext } from "react";
import styled from "styled-components";

import CartContext from "../../context/cartContext";
import Card from "../UI/Card";
import Heading from "../UI/Heading";
import CartItem from "./CartItem";
import Label from "../UI/Label";

const Wrapper = styled.div`
  min-height: 10rem;
  max-height: 35rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MyCart = () => {
  const cartContext = useContext(CartContext);

  let content = <Label>Your cart is empty!</Label>;

  if (cartContext.cart.length >= 1) {
    content = cartContext.cart.map((cartItem) => (
      <CartItem
        key={cartItem.id}
        id={cartItem.id}
        imageUrl={cartItem.smallImageUrl}
        title={cartItem.title}
        quantity={cartItem.quantity}
        price={cartItem.price}
      />
    ));
  }

  return (
    <Card>
      <Heading margin="1rem">Your cart</Heading>
      <Wrapper>{content}</Wrapper>
    </Card>
  );
};

export default MyCart;
