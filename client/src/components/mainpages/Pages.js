import React, { useContext } from "react";
import Products from "./products/Products";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import { Switch, Route } from "react-router-dom";
import Register from "./auth/Register";
import NotFound from "./utils/not_found/NotFound";
import DetailProduct from "./detail_product/DetailProduct";
import { GlobalState } from "../../GlobalState";
import OrderHistory from "./history/OrderHistory";
import OrderDetail from "./history/OrderDetail";
import Categories from "./categories/Categories";
import CreateProduct from "./create_product/CreateProduct";
function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />
      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : NotFound}
      />
      <Route
        path="/create-product"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route
        path="/edit-product/:id"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      />
      <Route path="/cart" exact component={Cart} />
      <Route
        path="/history"
        exact
        component={isLogged ? OrderHistory : NotFound}
      />
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetail : NotFound}
      />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
