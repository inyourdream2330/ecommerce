import React, { useContext } from "react";
import BtnRender from "./BtnRender";
import Loading from "../loading/Loading";
import { GlobalState } from "../../../../GlobalState";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  const state = useContext(GlobalState);
  const [itemLoading] = state.ProductsAPI.itemLoading;

  if (itemLoading.isLoading && itemLoading.product_id === product._id) {
    return (
      <div className="product_cart">
        <Loading />
      </div>
    );
  }
  return (
    <div className="product_cart">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url} alt="" />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
