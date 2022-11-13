import styled from "styled-components";

const Button = styled.button`
  margin: ${(props) => props.margin};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #1c7ed6;
  text-align: center;
  font-size: 1.8rem;
  width: fit-content;
  cursor: pointer;
`;

export default Button;
