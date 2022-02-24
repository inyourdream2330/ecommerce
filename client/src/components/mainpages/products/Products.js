import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";

function Products() {
  const state = useContext(GlobalState);
  const [products] = state.ProductsAPI.products;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.ProductsAPI.callback;

  return (
    <>
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              token={token}
              callback={callback}
              setCallback={setCallback}
            />
          );
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
