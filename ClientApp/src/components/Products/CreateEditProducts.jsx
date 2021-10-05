import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const CreateEditProducts = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const {
    open,
    toggleModal,
    header,
    productName,
    productPrice,
    updateProduct,
  } = props;
  const addProduct = () => {
    updateProduct(
      name !== "" ? name : productName,
      price !== "" ? price : productPrice
    );
    setName("");
    setPrice("");
  };

  return (
    <Modal open={open}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Product Name</label>
            <input
              value={name !== "" ? name : productName}
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Product Price</label>
            <input
              value={price !== "" ? price : productPrice}
              placeholder="Product Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          disabled={name.length < 1 && price.length < 1}
          color="green"
          onClick={addProduct}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateEditProducts;
