import React, { useState } from "react";
import BtnRender from "./BtnRender";
import axios from "axios";
import Loading from "../loading/Loading";

function ProductItem({ product, isAdmin, token, callback, setCallback }) {
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  if (loading)
    return (
      <div className="product_cart">
        <Loading />
      </div>
    );
  return (
    <div className="product_cart">
      {isAdmin && <input type="checkbox" />}
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
