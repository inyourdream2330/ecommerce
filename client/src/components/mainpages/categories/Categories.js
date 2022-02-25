import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import LoadMoreRelated from "../detail_product/LoadMoreRelated";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.CategoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.CategoriesAPI.callback;
  const [categoryDialog, setCategoryDialog] =
    state.CategoriesAPI.categoryDialog;
  const [loadMore, setLoadMore] = useState(6);

  useEffect(() => {
    setLoadMore(6);
  }, []);

  const handleLoadMore = () => {
    setLoadMore(loadMore + 6);
  };
  const showCategoryDialog = (action, id) => {
    setCategoryDialog({ isShow: true, action: action, categoryId: id });
  };

  const createCategory = async (e) => {
    debugger;
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
        <div className="list_categories">
          {categories.map(
            (item, index) =>
              index < loadMore && (
                <div className="row" key={item._id}>
                  <p>{item.name}</p>
                  <div>
                    <button
                      className="category-btn"
                      onClick={(e) => showCategoryDialog("edit", item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="category-btn"
                      onClick={(e) => showCategoryDialog("delete", item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
        {categories.length > loadMore && (
          <LoadMoreRelated handleLoadMore={handleLoadMore} />
        )}
      </div>
    </>
  );
}

export default Categories;
