import React, { useContext } from "react";
import styled from "styled-components";

import CartContext from "../../context/cartContext";
import Card from "../UI/Card";
import Product from "./Product";
import Heading from "../UI/Heading";
import Label from "../UI/Label";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media screen and (max-width: 1180px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const Products = () => {
  const cartContext = useContext(CartContext);

  let content = <Label>Loading products...</Label>;

  if (cartContext.isLoading) {
    content = <Label>Loading products...</Label>;
  }

  if (cartContext.error) {
    content = <Label>{cartContext.error}</Label>;
  }

  if (cartContext.products.length >= 1) {
    content = cartContext.products.map((product) => (
      <Product
        key={product.id}
        id={product.id}
        bigImageUrl={product.bigImage}
        smallImageUrl={product.smallImage}
        title={product.title}
        price={product.price}
      />
    ));

    if (cartContext.products.length === 0) {
      content = <Label>No products found!</Label>;
    }
  }

  return (
    <Card>
      <Heading>Available Products</Heading>
      <Container>{content}</Container>
    </Card>
  );
};

export default Products;
