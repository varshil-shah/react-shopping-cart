import React from "react";
import styled from "styled-components";

import CartProvider from "./context/CartProvider";
import Cart from "./components/Cart/Cart";
import Products from "./components/Product/Products";

const Wrapper = styled.div`
  max-width: 140rem;
  margin: 2rem auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  gap: 2rem;

  @media screen and (max-width: 950px) {
    grid-template-columns: 3fr 1.75fr;
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const App = () => {
  return (
    <CartProvider>
      <Wrapper>
        <Grid>
          <Products />
          <Cart />
        </Grid>
      </Wrapper>
    </CartProvider>
  );
};

export default App;
