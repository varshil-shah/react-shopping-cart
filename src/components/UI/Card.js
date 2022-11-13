import styled from "styled-components";

const Card = styled.div`
  padding: ${(props) => props.padding || "1rem"};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius || "3px"};
  overflow: hidden;
  align-self: flex-start;
`;

export default Card;
