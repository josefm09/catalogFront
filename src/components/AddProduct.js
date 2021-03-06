import React, { useState } from "react";
import ProductDataService from "../services/ProductService";

const AddProduct = props => {
  const initialProductState = {
    id: null,
    name: "",
    description: "",
    unitPrice: "",
    stock: "",
    published: false
  };
  const [product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = () => {
    var data = {
      name: product.name,
      description: product.description,
      unitPrice: product.unitPrice,
      stock: product.stock
    };

    ProductDataService.create(data)
      .then(response => {
        setProduct({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          unitPrice: response.data.unitPrice,
          stock: response.data.stock
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  const backMenu = () => {
    props.history.push("/products");
  };

  return (
    <div className="submit-form">
      <button className="btn btn-info" onClick={backMenu}>
        Volver a productos
      </button>
      {submitted ? (
        <div>
          <h4>Producto agregado con exito!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Agregar otro
          </button>
        </div>
      ) : (
        <div>      
          <h4>Agreagar producto</h4>
          <div className="form-group">
            <label className="required" htmlFor="name">Nombre del producto</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={product.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label className="required" htmlFor="description">Descripci??n</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label className="required" htmlFor="unitPrice">Precio unitario (MXN)</label>
            <input
              type="number"
              className="form-control"
              id="unitPrice"
              min="1"
              max="9999999"
              required
              value={product.unitPrice}
              onChange={handleInputChange}
              name="unitPrice"
            />
          </div>

          <div className="form-group">
            <label className="required" htmlFor="stock">Existencia</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              min="1"
              max="9999999"
              required
              value={product.stock}
              onChange={handleInputChange}
              name="stock"
            />
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
