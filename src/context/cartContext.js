import React from "react";

const CartContext = React.createContext({
  products: [],
  isLoading: false,
  error: null,
  cart: [],
  totalAmount: 0,
  payAmount: () => {},
  addProduct: (item) => {},
  removeProduct: (id) => {},
  deleteProduct: (id) => {},
  newProduct: (item) => {},
});

export default CartContext;
