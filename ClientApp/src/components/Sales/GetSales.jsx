import * as React from "react";
import { Menu, Icon, Table } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CreateEditSales from "./CreateEditSales";
import DeleteSale from "./DeleteSale";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { green, white } from "@material-ui/core/colors";

const GetSales = () => {
  const [products, setProducts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [customers, setCustomers] = React.useState("");
  const [sales, setSales] = React.useState([]);
  const [stores, setStores] = React.useState("");
  const [productSold, setProductSold] = React.useState("");
  const [header, setHeader] = React.useState("");
  const [saleId, setSaleId] = React.useState();

  const fetchData = React.useCallback(() => {
    axios
      .get("https://localhost:5001/Sales/GetSalesList")
      .then(({ data }) => {
        setSales(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createSale = () => {
    setOpen((open) => !open);
    setCustomers("");
    setProducts();
    setStores();
    setProductSold("");
    setHeader("Create Sale");
  };

  const editSale = (id, customerName, productName, storeName, proSold) => {
    setOpen((open) => !open);
    setCustomers(customerName);
    setProducts(productName);
    setStores(storeName);
    setProductSold(proSold);
    setHeader("Edit Sale");
    setSaleId(id);
  };

  const deleteSale = (id) => {
    setDeleteOpen((open) => !open);
    // setProductName(name);
    setSaleId(id);
  };

  const toggleModal = React.useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const updateData = React.useCallback(
    (customerName, productName, storeName, proSold) => {
      setOpen((open) => !open);
      if (!saleId) {
        debugger;
        axios
          .post("https://localhost:5001/Sales/AddSales", {
            id: saleId,
            customerName: customerName,
            productName: productName,
            storeName: storeName,
            proSold: proSold,
          })
          .then(() => {
            console.log();
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        debugger;
        axios
          .put(`https://localhost:5001/Sales/UpdateSales?Id=${saleId}`, {
            customerName: customerName,
            productName: productName,
            storeName: storeName,
            proSold: proSold,
          })
          .then(() => {
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [saleId, fetchData]
  );

  const deleteData = React.useCallback(() => {
    setDeleteOpen((open) => !open);
    axios
      .delete(`https://localhost:5001/Sales/DeleteSales?saleID=${saleId}`)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [saleId, fetchData]);

  return (
    <>
      <CreateEditSales
        toggleModal={toggleModal}
        open={open}
        header={header}
        updateProduct={updateData}
        customers={customers}
        products={products}
        stores={stores}
        productSold={productSold}
      />

      <DeleteSale
        toggleModal={() => setDeleteOpen((open) => !open)}
        open={deleteOpen}
        deleteSale={deleteData}
      />

      <Button
        onClick={createSale}
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
      >
        Create
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Store Name</Table.HeaderCell>
            <Table.HeaderCell>Product Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sales.map((sale) => (
            <Table.Row key={sale.id}>
              <Table.Cell>{sale.customerNavigation.name}</Table.Cell>
              <Table.Cell>{sale.productNavigation.name}</Table.Cell>
              <Table.Cell>{sale.storeNavigation.name}</Table.Cell>
              <Table.Cell>{sale.proSold}</Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() =>
                    editSale(
                      sale.id,
                      sale.customerName,
                      sale.productName,
                      sale.storeName,
                      sale.proSold
                    )
                  }
                  variant="outlined"
                  style={{ color: green[500] }}
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() =>
                    deleteSale(sale.id, sale.customerNavigation.customerName)
                  }
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
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default GetSales;
