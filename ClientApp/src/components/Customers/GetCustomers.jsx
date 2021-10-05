import * as React from "react";
import { Table, Menu, Icon } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CreateEditCustomers from "./CreateEditCustomers";
import DeleteCustomer from "./DeleteCustomer";
import { green, white } from "@material-ui/core/colors";

const GetCustomers = () => {
  const [customers, setCustomers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [customerName, setCustomerName] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [header, setHeader] = React.useState("");
  const [customerId, setCustomerId] = React.useState();

  const fetchData = React.useCallback(() => {
    axios
      .get("https://localhost:5001/customer/GetCustomers")
      .then(({ data }) => {
        setCustomers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createCustomer = () => {
    setOpen((open) => !open);
    setCustomerName("");
    setCustomerId();
    setCustomerAddress("");
    setHeader("Create Customer");
  };

  const editCustomer = (id, name, address) => {
    setOpen((open) => !open);
    setCustomerName(name);
    setCustomerAddress(address);
    setHeader("Edit Customer");
    setCustomerId(id);
  };

  const deleteCustomer = (id, name) => {
    setDeleteOpen((open) => !open);
    setCustomerName(name);
    setCustomerId(id);
  };

  const toggleModal = React.useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const updateData = React.useCallback(
    (name, address) => {
      setOpen((open) => !open);
      if (!customerId) {
        axios
          .post("https://localhost:5001/customer/AddCustomer", {
            id: customerId,
            name: name,
            address: address,
          })
          .then(() => {
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .put(
            `https://localhost:5001/customer/UpdateCustomer?Id=${customerId}`,
            {
              name: name,
              address: address,
            }
          )
          .then(() => {
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [customerId, fetchData]
  );

  const deleteData = React.useCallback(() => {
    setDeleteOpen((open) => !open);
    axios
      .delete(
        `https://localhost:5001/customer/DeleteCustomer?customerID=${customerId}`
      )
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [customerId, fetchData]);

  return (
    <>
      <CreateEditCustomers
        toggleModal={toggleModal}
        open={open}
        header={header}
        updateCustomer={updateData}
        customerName={customerName}
        customerAddress={customerAddress}
      />

      <DeleteCustomer
        toggleModal={() => setDeleteOpen((open) => !open)}
        open={deleteOpen}
        deleteCustomer={deleteData}
        customerName={customerName}
      />

      <Button
        onClick={createCustomer}
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
      >
        Create Customer
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Customer Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{customer.address}</Table.Cell>

              <Table.Cell>
                <Button
                  onClick={() =>
                    editCustomer(customer.id, customer.name, customer.address)
                  }
                  variant="outlined"
                  style={{ color: green[500] }}
                  endIcon={<EditIcon />}
                >
                  Edit Customer
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => deleteCustomer(customer.id, customer.name)}
                  variant="outlined"
                  color="secondary"
                  endIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default GetCustomers;
