import React from "react";

const CartContext = React.createContext({
  products: [],
  isLoading: false,
  error: null,
  cart: [],
  totalAmount: 0,
  addProduct: (item) => {},
  removeProduct: (id) => {},
  deleteProduct: (id) => {},
});

export default CartContext;
