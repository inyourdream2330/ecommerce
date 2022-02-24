import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.CategoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.CategoriesAPI.callback;
  const [categoryDialog, setCategoryDialog] =
    state.CategoriesAPI.categoryDialog;

  const showCategoryDialog = (action, id) => {
    setCategoryDialog({ isShow: true, action: action, categoryId: id });
  };

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/category",
        { name: category },
        { headers: { Authorization: token } }
      );
      setCategory("");
      setCallback(!callback);
      alert("Success");
    } catch (err) {
      alert(err.message.data.msg);
    }
  };

  return (
    <>
      <div className="categories">
        <form onSubmit={createCategory}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
        <div>
          {categories.map((item) => (
            <div className="row" key={item._id}>
              <p>{item.name}</p>
              <div>
                <button onClick={(e) => showCategoryDialog("edit", item._id)}>
                  Edit
                </button>
                <button onClick={(e) => showCategoryDialog("delete", item._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
