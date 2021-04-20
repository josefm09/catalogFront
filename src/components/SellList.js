import React, { useState, useEffect } from "react";
import SellDataService from "../services/SellService";
import { Link } from "react-router-dom";

const SellList = () => {
  const [sells, setSells] = useState([]);
  const [currentSell, setCurrentSell] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveSells();
  }, []);

  const retrieveSells = () => {
    SellDataService.getAll()
      .then(response => {
        let sells = response.data;

        sells.forEach((element, index) => {
          let date = new Date(element.created);
          sells[index].created = date.toLocaleDateString('en-GB');
        });
        setSells(sells);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveSell = (sell, index) => {
    setCurrentSell(sell);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
            <Link
              to={"/mostSell"}
              className="btn btn-info"
            >
            Ver articulos mas vendidos
          </Link>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de ventas</h4>

        <ul className="list-group">
          {sells &&
            sells.map((sell, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveSell(sell, index)}
                key={index}
              >
                {sell.total}$ MXN - Fecha: {sell.created}
                <div>
                  <span></span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentSell ? (
          <div>
            <h4>Detalles de la venta</h4>
            <div>
              <label>
                <strong>Cliente:</strong>
              </label>{" "}
              {currentSell.idClient}
            </div>
            <div>
              <label>
                <strong>Total:</strong>
              </label>{" "}
              {currentSell.total}$ MXN
            </div>
            <div>
              <label>
                <strong>Pago del cliente:</strong>
              </label>{" "}
              {currentSell.payment}$ MXN
            </div>
            <div>
              <label>
                <strong>Productos:</strong>
              </label>{" "}<br/>
              {currentSell.products.map((product, index) => (
                <span key={index}>
                    {product.name} - cantidad: {product.quantity} <br/>
                </span>
              ))}
            </div>
            <div>
              <label>
                <strong>Fecha de la venta:</strong>
              </label>{" "}
              {currentSell.created}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Has click en una venta para mostrar los detalles de la operacion...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellList;
