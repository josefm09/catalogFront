import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [cartProducts, setCartProducts] = useState([]);

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
    if(document.getElementById("quantity") != null){
      document.getElementById("quantity").value = "";
    }
  };

  const addCart = () => {
    let activo = document.querySelector(".active span")
    let quantity = document.getElementById("quantity");
    activo.innerHTML = 'En el carrito: '+quantity.value+'';

    if(!(currentProduct.product_id in cartProducts)){
      currentProduct.quantity = quantity.value;
      setCartProducts([...cartProducts, currentProduct]);
    }else {
      cartProducts[currentProduct.product_id].quantity = quantity.value;
    }

    //codigo que se va a pasar al checkout
    let unique = cartProducts.filter(onlyUnique);
  };

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
            <Link
              to={{ pathname: "/checkout", state: { cart: cartProducts }}}
              className="btn btn-success"
            >
            Pagar articulos en carrito
          </Link>
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
                <div>
                  <span></span>
                </div>
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
                name="quantity"
              />
              <button className="btn btn-info" onClick={addCart}>
                Agregar
              </button>
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
