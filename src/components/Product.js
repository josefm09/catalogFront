import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";

const Product = props => {
  const initialProductState = {
    product_id: "",
    name: "",
    description: "",
    unitPrice: "",
    stock: ""
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updateProduct = () => {
    ProductDataService.update(currentProduct)
      .then(response => {
        console.log(response.data);
        setMessage("El producto se actualizo con exito!");
        props.history.push("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.product_id)
      .then(response => {
        console.log(response.data);
        props.history.push("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const backMenu = () => {
    props.history.push("/products");
  };

  return (
    <div>
      <button className="btn btn-info" onClick={backMenu}>
        Volver a productos
      </button>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Modificar producto</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
            <label htmlFor="unitPrice">Precio unitario</label>
            <input
              type="number"
              className="form-control"
              id="unitPrice"
              min="1"
              max="9999999"
              value={currentProduct.unitPrice}
              onChange={handleInputChange}
              name="unitPrice"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Existencia</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              min="1"
              max="9999999"
              value={currentProduct.stock}
              onChange={handleInputChange}
              name="stock"
            />
          </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteProduct}>
            Eliminar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProduct}
          >
            Actualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Has click en un producto...</p>
        </div>
      )}
    </div>
  );
};

export default Product;
