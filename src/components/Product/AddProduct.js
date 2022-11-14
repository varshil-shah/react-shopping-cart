import React, { useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { v4 } from "uuid";

import { ImCross } from "react-icons/im";
import Heading from "../UI/Heading";
import Input from "../UI/InputField";
import Button from "../UI/Button";

const Card = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 2rem;
  width: 40%;
  z-index: 100;

  @media screen and (max-width: 1120px) {
    width: 60%;
  }

  @media screen and (max-width: 630px) {
    width: 80%;
  }

  @media screen and (max-width: 520px) {
    width: 90%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
`;

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const AddProduct = (props) => {
  const companyNameRef = useRef();
  const priceRef = useRef();
  const imageUrlRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const companyName = companyNameRef.current.value;
    const price = +priceRef.current.value;
    const imageUrl = imageUrlRef.current.value.split("?")[0];

    if (
      companyName.trim().length === 0 ||
      price <= 0 ||
      imageUrl.trim().length === 0
    )
      return props.showToast("Please enter valid information.");

    const newProduct = {
      id: v4(),
      title: `${companyName} Laptop`,
      price: +price,
      description:
        "A computer is a machine or device that performs processes, calculations and operations based on instructions provided",
      bigImage: `${imageUrl}?auto=compress&cs=tinysrgb&h=350`,
      smallImage: `${imageUrl}?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280`,
    };

    // Reset all values
    companyNameRef.current.value = "";
    priceRef.current.value = 0;
    imageUrlRef.current.value = "";

    // Hide modal
    props.hideModal();
  };

  return (
    props.showModal &&
    ReactDOM.createPortal(
      <>
        <Overlay onClick={props.hideModal} />
        <Card>
          <Flex justifyContent="space-between">
            <Heading>Add Product</Heading>
            <ImCross
              onClick={props.hideModal}
              style={{
                fontSize: "1.6rem",
                color: "#333",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            />
          </Flex>
          <Form onSubmit={onSubmitHandler}>
            <FormControl gap="0.5rem">
              <Input
                ref={companyNameRef}
                label="Company name"
                style={{
                  type: "text",
                  placeholder: "Lenovo",
                  required: true,
                }}
              />
            </FormControl>
            <FormControl gap="0.5rem">
              <Input
                ref={priceRef}
                label="Price"
                style={{
                  type: "number",
                  placeholder: "500",
                  required: true,
                  min: 0,
                }}
              />
            </FormControl>
            <FormControl gap="0.5rem">
              <Input
                ref={imageUrlRef}
                label="Image URL"
                style={{
                  type: "url",
                  placeholder: "https://www.example.com/image.jpg",
                  required: true,
                }}
              />
            </FormControl>
            <Button>Submit</Button>
          </Form>
        </Card>
      </>,
      document.getElementById("modal")
    )
  );
};

export default AddProduct;
