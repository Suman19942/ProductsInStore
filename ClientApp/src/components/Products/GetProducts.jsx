import * as React from "react";
import { Menu, Icon, Table } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CreateEditProducts from "./CreateEditProducts";
import DeleteProduct from "./DeleteProduct";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { green, white } from "@material-ui/core/colors";

const GetProducts = () => {
  const [products, setProducts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [header, setHeader] = React.useState("");
  const [productId, setProductId] = React.useState();

  const fetchData = React.useCallback(() => {
    axios
      .get("https://localhost:5001/product/GetProductList")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createProduct = () => {
    setOpen((open) => !open);
    setProductName("");
    setProductId();
    setProductPrice("");
    setHeader("Create Product");
  };

  const editProduct = (id, name, price) => {
    setOpen((open) => !open);
    setProductName(name);
    setProductPrice(price);
    setHeader("Edit Product");
    setProductId(id);
  };

  const deleteProduct = (id, name) => {
    setDeleteOpen((open) => !open);
    setProductName(name);
    setProductId(id);
  };

  const toggleModal = React.useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const updateData = React.useCallback(
    (name, price) => {
      setOpen((open) => !open);
      if (!productId) {
        debugger;
        axios
          .post("https://localhost:5001/product/AddProduct", {
            id: productId,
            name: name,
            price: price,
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
          .put(`https://localhost:5001/product/UpdateProduct?Id=${productId}`, {
            name: name,
            price: price,
          })
          .then(() => {
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [productId, fetchData]
  );

  const deleteData = React.useCallback(() => {
    setDeleteOpen((open) => !open);
    axios
      .delete(
        `https://localhost:5001/product/DeleteProduct?productID=${productId}`
      )
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId, fetchData]);

  return (
    <>
      <CreateEditProducts
        toggleModal={toggleModal}
        open={open}
        header={header}
        updateProduct={updateData}
        productName={productName}
        productPrice={productPrice}
      />

      <DeleteProduct
        toggleModal={() => setDeleteOpen((open) => !open)}
        open={deleteOpen}
        deleteProduct={deleteData}
        productName={productName}
      />

      <Button
        onClick={createProduct}
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
      >
        Create
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Product Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>€{product.price}</Table.Cell>

              <Table.Cell>
                <Button
                  onClick={() =>
                    editProduct(product.id, product.name, product.price)
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
                  onClick={() => deleteProduct(product.id, product.name)}
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

export default GetProducts;
