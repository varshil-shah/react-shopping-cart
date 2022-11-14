import React, { useContext, useState } from "react";
import styled from "styled-components";

import CartContext from "../../context/cartContext";
import Card from "../UI/Card";
import Product from "./Product";
import Heading from "../UI/Heading";
import Label from "../UI/Label";
import Button from "../UI/Button";
import AddProduct from "./AddProduct";

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

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Products = (props) => {
  const [showModal, setShowModal] = useState(false);
  const cartContext = useContext(CartContext);

  const displayModal = () => setShowModal(true);
  const hideModal = () => setShowModal(false);

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
        showToast={props.showToast}
      />
    ));

    if (cartContext.products.length === 0) {
      content = <Label>No products found!</Label>;
    }
  }

  return (
    <>
      <Card>
        <Flex>
          <Heading margin="1rem">Products</Heading>
          <Button margin="0 0 1rem 0" onClick={displayModal}>
            Add Product
          </Button>
        </Flex>
        <Container>{content}</Container>
      </Card>
      <AddProduct
        showModal={showModal}
        hideModal={hideModal}
        showToast={props.showToast}
      />
    </>
  );
};

export default Products;
