import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.CategoriesAPI.categories;
  const [category, setCategory] = state.ProductsAPI.category;
  const [sort, setSort] = state.ProductsAPI.sort;
  const [search, setSearch] = state.ProductsAPI.search;
  const [firstLoading, setFirstLoading] = state.ProductsAPI.firstLoading;
  const [page, setPage] = state.ProductsAPI.page;

  const handleCategory = (e) => {
    setFirstLoading(true);
    setCategory(e.target.value);
    setSearch("");
    setPage(1);
  };

  const handleSort = (e) => {
    setFirstLoading(true);
    setSort(e.target.value);
  };

  return (
    <div className="filter-menu">
      <div className="f-row">
        <span>Filter</span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">Categories</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="Enter your search!"
        name=""
        id=""
        onChange={(e) => {
          setSearch(e.target.value.toLocaleLowerCase());
        }}
      />

      <div className="s-row">
        <span>Order by</span>
        <select name="category" value={sort} onChange={handleSort}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: High -&gt; Low</option>
          <option value="sort=price">Price: Low -&gt; High </option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
