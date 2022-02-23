import axios from "axios";
import { useEffect, useState } from "react";

function CategoriesAPI(token) {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  const [categoryDialog, setCategoryDialog] = useState({
    action: "",
    isShow: false,
    categoryId: null,
  });

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };
    getCategories();
  }, [callback]);
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
    categoryDialog: [categoryDialog, setCategoryDialog],
  };
}

export default CategoriesAPI;
