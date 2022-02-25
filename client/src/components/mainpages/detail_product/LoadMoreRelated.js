import React from "react";
function LoadMoreRelated({ handleLoadMore }) {
  return (
    <div className="load_more load_more_related">
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}

export default LoadMoreRelated;
