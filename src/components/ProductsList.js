import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        let products = response.data;

        products.forEach((element, index) => {
          let date = new Date(element.created);
          products[index].created = date.toLocaleDateString('en-GB');
        });
        setProducts(products);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveProduct = (product, index) => {
    setCurrentProduct(product);
    setCurrentIndex(index);
  };

  const addCart = () => {
    let activo = document.getElementsByClassName("active");
    let quantity = document.getElementById("quantity");
    var first = document.createElement("span");
    var text = document.createTextNode("Carrito: "+quantity.value);
    first.appendChild(text);
    activo[0].appendChild(first);
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <button
            className="btn btn-success"
            type="button"
            onClick={addCart}
          >
            Pagar articulos en carrito
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de productos</h4>

        <ul className="list-group">
          {products &&
            products.map((product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(product, index)}
                key={index}
              >
                {product.name.substring(0,40)}

              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Producto</h4>
            <div>
              <label>
                <strong>Clave del producto:</strong>
              </label>{" "}
              {currentProduct.product_id}
            </div>
            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {currentProduct.name}
            </div>
            <div>
              <label>
                <strong>Descripción:</strong>
              </label>{" "}
              {currentProduct.description}
            </div>
            <div>
              <label>
                <strong>Precio unitario:</strong>
              </label>{" "}
              {currentProduct.unitPrice}$ MXN
            </div>
            <div>
              <label>
                <strong>Existencia:</strong>
              </label>{" "}
              {currentProduct.stock} Unidades
            </div>
            <div>
              <label>
                <strong>Fecha de captura:</strong>
              </label>{" "}
              {currentProduct.created}
            </div>
            <div>
              <label>
                <strong>Agregar al carrito:</strong>
              </label>{" "}
              <input
                type="number"
                className="col-md-3"
                id="quantity"
                min="1"
                max={currentProduct.stock}
                onChange={addCart}
                name="quantity"
              />
            </div>


            <Link
              to={"/products/" + currentProduct.product_id}
              className="badge badge-warning"
            >
              Editar producto
            </Link>

          </div>
        ) : (
          <div>
            <br />
            <p>Has click en un producto...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
