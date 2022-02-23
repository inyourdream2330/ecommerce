import { useEffect, useState } from "react";
import axios from "axios";
import { LoginToContinue } from "../components/mainpages/utils/login_to_continue/LoginToContinue";
function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.data.cart);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  // Add product to cart
  const addCart = async (product) => {
    LoginToContinue(isLogged, "#");
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        "/user/addcart",
        {
          cart: [...cart, { ...product, quantity: 1 }],
        },
        { headers: { Authorization: token } }
      );
      alert("Đã thêm sản phẩm vào giỏ hàng");
    } else {
      alert("Sản phẩm đã được thêm vào giỏ hàng.");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    callback: [callback, setCallback],
  };
}

export default UserAPI;
