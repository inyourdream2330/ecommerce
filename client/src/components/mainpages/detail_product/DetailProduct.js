import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import LoadMoreRelated from "./LoadMoreRelated";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.ProductsAPI.products;
  const addCart = state.UserAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);
  const [loadMore3, setLoadMore3] = useState(3);

  useEffect(() => {
    setLoadMore3(3);
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [params.id, products]);
  if (detailProduct.length === 0) return null;

  const handleLoadMore = () => {
    setLoadMore3(loadMore3 + 3);
  };

  return (
    <>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link to="!#" className="cart" onClick={() => addCart(detailProduct)}>
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2>Related products</h2>
        <div className="products">
          {products
            .filter((value) => {
              return (
                value._id !== detailProduct._id &&
                value.category == detailProduct.category
              );
            })
            .map((product, index) => {
              return index < loadMore3 ? (
                <ProductItem key={product._id} product={product} />
              ) : null;
            })}
        </div>
        {products.filter((value) => {
          return (
            value._id !== detailProduct._id &&
            value.category == detailProduct.category
          );
        }).length > loadMore3 ? (
          <LoadMoreRelated handleLoadMore={handleLoadMore} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default DetailProduct;
