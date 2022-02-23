import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";
import { useEffect } from "react";
import axios from "axios";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.ProductsAPI.products;
  const [isAdmin] = state.UserAPI.isAdmin;
  const getProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
