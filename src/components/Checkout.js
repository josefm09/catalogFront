import React, { useState, useEffect } from "react";
import SellDataService from "../services/SellService";

const Checkout = props => {
  const initialState = {
    idClient: "",
    total: 0,
    payment: "",
    products: []
  };
  const [checkout, setCheckout] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState([])

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    let unique = props.location.state.cart.filter(onlyUnique);
    console.log(unique);
    setProducts(unique);

    unique.forEach(element => {
        checkout.total += element.totalPrice;
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCheckout({ ...checkout, [name]: value });
  };

  const saveCheckout = () => {
    if(checkout.payment < checkout.total){
        alert("Favor de cubrir el total a pagar");
        return;
    }else {
        var data = {
            idClient: checkout.idClient,
            total: checkout.total,
            payment: checkout.payment,
            products: products
        };
    
        SellDataService.create(data)
        .then(response => {
            setCheckout({
            idClient: response.data.idClient,
            total: response.data.total,
            payment: response.data.payment,
            products: response.data.products
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
  };

  const backMenu = () => {
    props.history.push("/products");
  };

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  return (
    <div>
      <button className="btn btn-info" onClick={backMenu}>
        Volver a productos
      </button>
      {submitted ? (
        <div>
          <h4>Venta realizada con exito!</h4>
        </div>
      ) : (
        <div>      
          <h4>Vender productos</h4>
          <table className="table">
              <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Precio total</th>
                  </tr>
              </thead>
              <tbody>
                {products &&
                    products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name.substring(0,40)}</td>
                        <td>{product.quantity}</td>
                        <td>{product.unitPrice}$</td>
                        <td>{product.totalPrice}$</td>
                    </tr>
                ))}
              </tbody>
              <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total a pagar:</td>
                    <td id="total">{checkout.total}$ MXN</td>
                  </tr>
              </tfoot>
          </table>
          <div className="row">
            <div className="form-group mx-auto">
                <label className="required" htmlFor="idClient">Identificador del cliente</label>
                <input
                type="text"
                className="form-control"
                id="idClient"
                required
                value={checkout.idClient}
                onChange={handleInputChange}
                name="idClient"
                />
            </div>

            <div className="form-group mx-auto">
                <label className="required" htmlFor="payment">Importe pagado (MXN)</label>
                <input
                type="number"
                className="form-control"
                id="payment"
                min="1"
                max="9999999"
                required
                value={checkout.payment}
                onChange={handleInputChange}
                name="payment"
                />
            </div>
          
            <div className="mx-auto">
                <button onClick={saveCheckout} className="btn btn-success">
                    Pagar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
