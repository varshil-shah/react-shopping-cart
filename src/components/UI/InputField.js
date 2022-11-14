import React from "react";
import styled from "styled-components";

import Label from "../UI/InputLabel";

const Field = styled.input`
  border: 1px solid #333;
  padding: 1rem 0.5rem;
  outline: none;
  font-size: 1.8rem;

  &::placeholder {
    font-size: 1.8rem;
    color: #888;
  }
`;

const InputField = React.forwardRef((props, ref) => {
  return (
    <>
      <Label>{props.label}</Label>
      <Field {...props.style} ref={ref} />
    </>
  );
});
export default InputField;
