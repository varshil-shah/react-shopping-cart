import React, { useContext } from "react";
import styled from "styled-components";

import CartContext from "../../context/cartContext";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Heading from "../UI/Heading";

const Paragraph = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1.8;
  background-color: #f2f2f2;
  color: #333;
  padding: 0.5rem 1rem;
`;

const Bold = styled.span`
  font-weight: 600;
  color: #333;
`;

const MyTotal = () => {
  const cartContext = useContext(CartContext);
  const totalAmount = cartContext.totalAmount.toFixed(2, "0");

  return (
    <Card>
      <Heading>Grand Total</Heading>
      <Paragraph>
        Your total amount is <Bold>${`${totalAmount}`}</Bold>
      </Paragraph>
      <Button>Pay here</Button>
    </Card>
  );
};

export default MyTotal;
