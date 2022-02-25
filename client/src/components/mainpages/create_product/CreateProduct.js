import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";
import Rotate from "./Rotate";

function CreateProduct() {
  const initialState = {
    product_id: "",
    title: "",
    price: 0,
    description: "Meow meow Meow meow Meow meow Meow meow Meow meow Meow meow",
    content:
      "Nyan nyan Nyan nyan Nyan nyan Nyan nyan Nyan nyan Nyan nyan Nyan nyan ",
    category: "",
    _id: "",
    images: "1",
  };

  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.CategoriesAPI.categories;
  const [onEdit, setOnEdit] = useState(false);
  const [isAdmin] = state.UserAPI.isAdmin;
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const history = useHistory();
  const param = useParams();
  const [products] = state.ProductsAPI.products;
  const [previewImage, setPrevireImage] = useState();
  const [imagesFile, setImagesFile] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [callback, setCallback] = state.ProductsAPI.callback;

  const imageHandler = (e) => {
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
    setLoading(true);
    setPrevireImage(URL.createObjectURL(file));
    setImagesFile(file);
    setLoading(false);
    if (onEdit) {
      setIsChangeImage(true);
    }

    // const reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     previewImage(reader.result);
    //     console.log(previewImage);
    //   }
    // };
  };

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setPrevireImage(product.images.url);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setPrevireImage(false);
    }
  }, [param.id, products]);

  const styleUpload = {
    display: previewImage ? "block" : "none",
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const uploadImages = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("file", imagesFile);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      return res.data;
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
      if (!previewImage) {
        return alert("Chưa có ảnh sản phẩm");
      }

      if (onEdit) {
        const images = isChangeImage ? await uploadImages(e) : product.images;
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        await axios.post(
          "/api/destroy",
          { public_id: product.images.public_id },
          { headers: { Authorization: token } }
        );
      } else {
        const images = await uploadImages(e);
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }

      setProduct(initialState);
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={imageHandler} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={previewImage ? previewImage : ""} alt="" />
            <label htmlFor="file_up">
              <Rotate />
            </label>
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
          <button type="Submit">{onEdit ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
