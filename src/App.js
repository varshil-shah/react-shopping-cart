import React from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: #333;
`;

const App = () => {
  const displayToast = (message) => {
    toast(<Text>{message}</Text>, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <CartProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Wrapper>
        <Grid>
          <Products showToast={displayToast} />
          <Cart showToast={displayToast} />
        </Grid>
      </Wrapper>
    </CartProvider>
  );
};

export default App;
