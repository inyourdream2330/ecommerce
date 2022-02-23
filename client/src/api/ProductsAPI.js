import { useState, useEffect } from "react";
function ProductsAPI() {
  const [products, setProducts] = useState([]);

  return {
    products: [products, setProducts],
  };
}

export default ProductsAPI;
