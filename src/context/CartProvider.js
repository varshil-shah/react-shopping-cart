import React, { useReducer, useEffect, useState, useCallback } from "react";

import CartContext from "./cartContext";
import { ADD, REMOVE, DELETE } from "./cart.types";

const defaultValues = {
  products: [],
  isLoading: false,
  error: null,
  cart: [],
  totalAmount: 0,
  addProduct: (item) => {},
  removeProduct: (id) => {},
  deleteProduct: (id) => {},
};

const cartReducer = (state, action) => {
  // When a new product is added to cart
  if (action.type === ADD) {
    // Initial value + (current product price * current product quantity)
    const updateTotalAmount =
      state.totalAmount + action.product.price * action.product.quantity;

    const existingCartProductIndex = state.cart.findIndex(
      (product) => product.id === action.product.id
    );
    const existingCartProduct = state.cart[existingCartProductIndex];

    let updatedCartProducts;
    if (existingCartProduct) {
      const updatedProduct = {
        ...existingCartProduct,
        quantity: existingCartProduct.quantity + action.product.quantity,
      };
      updatedCartProducts = [...state.cart];
      updatedCartProducts[existingCartProductIndex] = updatedProduct;
    } else {
      updatedCartProducts = state.cart.concat(action.product);
    }

    return {
      cart: updatedCartProducts,
      totalAmount: updateTotalAmount,
    };
  }

  // When a product is removed from the cart
  if (action.type === REMOVE) {
    const existingCartProductIndex = state.cart.findIndex(
      (product) => product.id === action.id
    );
    const existingCartProduct = state.cart[existingCartProductIndex];
    if (!existingCartProduct) return { ...state };
    const updatedTotalAmount = state.totalAmount - existingCartProduct.price;
    let updatedCartProducts;
    if (existingCartProduct.quantity === 1) {
      updatedCartProducts = state.cart.filter(
        (product) => product.id !== action.id
      );
    } else {
      const updatedProduct = {
        ...existingCartProduct,
        quantity: existingCartProduct.quantity - 1,
      };
      updatedCartProducts = [...state.cart];
      updatedCartProducts[existingCartProductIndex] = updatedProduct;
    }

    return {
      totalAmount: updatedTotalAmount,
      cart: updatedCartProducts,
    };
  }

  // When a product is deleted from cart
  if (action.type === DELETE) {
    const updatedCartProducts = state.cart.filter(
      (product) => product.id !== action.id
    );
    const updatedTotalAmount = updatedCartProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );

    return {
      totalAmount: updatedTotalAmount,
      cart: updatedCartProducts,
    };
  }
};

const CartProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    defaultValues
  );

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/636fd49a0e6a79321e47a703"
      );

      if (!response.ok) {
        throw new Error("Something went wrong while loading products!");
      }

      const data = await response.json();
      setProducts(data.record);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProductToCartHandler = (product) => {
    dispatchCartActions({
      type: ADD,
      product,
    });
  };

  const removeProductFromCartHandler = (product) => {
    dispatchCartActions({
      type: REMOVE,
      id: product.id,
    });
  };

  const deleteProductFromCartHandler = (product) => {
    dispatchCartActions({
      type: DELETE,
      id: product.id,
    });
  };

  const cartContext = {
    products,
    isLoading,
    error,
    cart: cartState.cart,
    totalAmount: cartState.totalAmount,
    addProduct: addProductToCartHandler,
    removeProduct: removeProductFromCartHandler,
    deleteProduct: deleteProductFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
