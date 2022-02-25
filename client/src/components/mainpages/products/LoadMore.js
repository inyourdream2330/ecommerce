import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.ProductsAPI.page;
  const [result] = state.ProductsAPI.result;

  const handlePage = () => {
    setPage(page + 1);
  };

  return (
    <div className="load_more">
      {result <= page * 9 ? (
        <div style={{ height: "44px" }}></div>
      ) : (
        <button onClick={handlePage}>Load More</button>
      )}
    </div>
  );
}

export default LoadMore;
