import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import ProductsList from "./components/ProductsList";
import Checkout from "./components/Checkout";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/products" className="navbar-brand">
          Catálogo de productos
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Agregar un producto
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/products"]} component={ProductsList} />
          <Route exact path="/add" component={AddProduct} />
          <Route path="/products/:id" component={Product} />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
