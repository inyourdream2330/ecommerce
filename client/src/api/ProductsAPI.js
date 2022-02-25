import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [firstLoading, setFirstLoading] = useState(false);
  const [notLoading, setNotLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState({
    isLoading: false,
    product_id: "",
  });

  useEffect(() => {
    const getProducts = async () => {
      if (!notLoading) setFirstLoading(true);
      const res = await axios.get(
        `/api/products?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
      setFirstLoading(false);
      setNotLoading(true);
    };
    getProducts();
  }, [callback, category, sort, search, page]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    firstLoading: [firstLoading, setFirstLoading],
    notLoading: [notLoading, setNotLoading],
    itemLoading: [itemLoading, setItemLoading],
  };
}

export default ProductsAPI;
