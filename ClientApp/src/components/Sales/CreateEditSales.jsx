import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const CreateEditSales = (props) => {
  const [custName, setCustName] = useState("");
  const [prodName, setProdName] = useState("");
  const [stName, setStName] = useState("");
  const [pdSold, setPDSold] = useState("");
  const {
    open,
    toggleModal,
    header,
    customerName,
    productName,
    storeName,
    proSold,
    updateSale,
  } = props;
  const addSale = () => {
    updateSale(
      custName !== "" ? custName : customerName,
      prodName !== "" ? prodName : productName,
      stName !== "" ? stName : storeName,
      pdSold !== "" ? pdSold : proSold
    );
    setCustName("");
    setProdName("");
    setStName("");
    setPDSold("");
  };

  return (
    <Modal open={open}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Customer Name</label>
            <input
              value={custName !== "" ? custName : customerName}
              placeholder="Customer Name"
              onChange={(e) => setCustName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Product Name</label>
            <input
              value={prodName !== "" ? prodName : productName}
              placeholder="Product Name"
              onChange={(e) => setProdName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Store Name</label>
            <input
              value={stName !== "" ? stName : storeName}
              placeholder="Store Name"
              onChange={(e) => setStName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Product Sold</label>
            <input
              value={pdSold !== "" ? pdSold : proSold}
              placeholder="Product Sold"
              onChange={(e) => setPDSold(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          disabled={
            custName.length < 1 &&
            prodName.length < 1 &&
            stName.length < 1 &&
            pdSold.length < 1
          }
          color="green"
          onClick={addSale}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateEditSales;
