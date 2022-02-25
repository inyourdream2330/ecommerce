import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import { useState } from "react";
import Filters from "./Filters";
import LoadMore from "./LoadMore";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.ProductsAPI.products;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.ProductsAPI.callback;
  const [itemLoading, setItemLoading] = state.ProductsAPI.itemLoading;
  const [isCheck, setIsCheck] = useState(false);

  const [firstLoading] = state.ProductsAPI.firstLoading;

  useEffect(() => {}, []);
  const deleteProduct = async (id, public_id) => {
    try {
      const destroyImg = axios.post(
        "/api/destroy",
        {
          public_id,
        },
        { headers: { Authorization: token } }
      );

      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });
      setItemLoading({ isLoading: true, product_id: id });

      await destroyImg;
      await deleteProduct;
      setItemLoading({ isLoading: false, product_id: "" });
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) {
        deleteProduct(product._id, product.images.public_id);
      }
    });
  };

  if (firstLoading)
    return (
      <div>
        <Filters />
        <Loading />
      </div>
    );
  return (
    <>
      <Filters />
      {isAdmin && (
        <div className="delete-all">
          <label htmlFor="delete-all">Chọn tất cả</label>
          <input
            type="checkbox"
            name=""
            id="delete-all"
            checked={isCheck}
            onChange={checkAll}
          />
          <button onClick={deleteAll}>Xoá tất cả</button>
        </div>
      )}
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && (
        <div className="no-products">
          <h1>Không có sản phẩm nào</h1>
        </div>
      )}
    </>
  );
}

export default Products;
