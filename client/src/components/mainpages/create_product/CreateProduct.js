import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";

function CreateProduct() {
  const initialState = {
    product_id: "",
    title: "",
    price: 0,
    description: "Meow meow Meow meow Meow meow Meow meow Meow meow Meow meow",
    content:
      "Nyan nyan Nyan nyan Nyan nyan Nyan nyan Nyan nyan Nyan nyan Nyan nyan ",
    category: "",
    id: "",
  };

  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.CategoriesAPI.categories;
  const [onEdit, setOnEdit] = useState(false);
  const [images, setImages] = useState(false);
  const [isAdmin] = state.UserAPI.isAdmin;
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const history = useHistory();
  const param = useParams();
  const [products, setProducts] = state.ProductsAPI.products;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("Bạn không phải admin");
      }
      const file = e.target.files[0];
      if (!file) {
        return alert("File bị lỗi hoặc không tồn tại");
      }

      if (file.size > 1024 * 1024) {
        return alert("File quá lớn, chỉ <= 1mb");
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("Không đúng định dạng ảnh (jpg/jpeg/png");
      }

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) {
        return alert("Bạn không phải admin");
      }
      const res = await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        { headers: { Authorization: token } }
      );
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("Bạn không phải admin");
      }
      if (!images) {
        return alert("Chưa có ảnh sản phẩm");
      }

      await axios.post(
        "/api/products",
        { ...product, images },
        {
          headers: { Authorization: token },
        }
      );
      setProduct(initialState);
      setImages(false);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col">
          <div className="row">
            <label htmlFor="product_id">Product ID </label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
            />
          </div>
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="description">Desciption</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              rows="5"
              onChange={handleChangeInput}
            />
          </div>
          <div className="row">
            <label htmlFor="categories">Categories</label>
            <select
              name="category"
              value={product.category}
              id="categories"
              onChange={handleChangeInput}
            >
              <option value="">------------</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="Submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
