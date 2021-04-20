import React, { useState, useEffect } from "react";
import ProductDataService from "../services/ProductService";
import { Link } from "react-router-dom";

const MostSell = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    ProductDataService.getMostSelled()
      .then(response => {
        let products = response.data;
        setProducts(products);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveProduct = (product, index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
            <Link
              to={"/sells"}
              className="btn btn-info"
            >
            Volver al listado de ventas
          </Link>
        </div>
      </div>
      <div>
        <h4>Lista de productos ordenados del mas al menos vendido</h4>

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
                {index+1} - {product.name.substring(0,40)}, se ha vendido {product.sellTimes} veces
                <div>
                  <span></span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MostSell;
