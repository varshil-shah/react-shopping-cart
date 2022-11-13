import React from "react";

import MyCart from "./MyCart";
import MyTotal from "./MyTotal";

const Cart = (props) => {
  return (
    <div>
      <MyCart />
      <MyTotal showToast={props.showToast} />
    </div>
  );
};

export default Cart;
