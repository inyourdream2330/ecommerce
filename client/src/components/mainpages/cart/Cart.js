import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import PaypalButton from "./PaypalButton";
function Cart() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.UserAPI.cart;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      { headers: { Authorization: token } }
    );
  };

  // Increase quantity product 1
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };
  // Deincrease quantity product 1
  const deincrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart([]);
  };
  // Remove product in cart
  const removeProduct = (id) => {
    if (window.confirm("Bạn có muốn xoá sản phẩm này không ?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
    }
    setCart([...cart]);
    addToCart(cart);
  };

  // Add cart to payment paypal
  const tranSuccess = async (payment) => {
    console.log(payment);
    const { paymentID, address } = payment;
    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      { headers: { Authorization: token } }
    );
    setCart([]);
    addToCart([]);
    console.log(cart);
    alert("Bạn đã đặt hàng thành công.");
    // setCallback(!callback);
  };
  // Show empty cart notification
  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "4rem" }}>Giỏ hàng trống.</h2>
    );
  }
  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />
          <div className="box-detail">
            <h2>{product.title}</h2>

            <h3>$ {product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button onClick={() => deincrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total : $ {total}</h3>
        <Link to="#!">Payment</Link>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}

export default Cart;
