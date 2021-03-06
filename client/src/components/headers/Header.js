import React, { useContext, useState } from "react";

import { GlobalState } from "../../GlobalState";
import Menu from "../icon/menu.svg";
import Cart from "../icon/cart.svg";
import Close from "../icon/close.svg";
import { Link } from "react-router-dom";
import axios from "axios";

import { LoginToContinue } from "../mainpages/utils/login_to_continue/LoginToContinue";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [cart] = state.UserAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    window.location.href = "/";
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const HeaderLink = (path, title) => {
    return (
      <li>
        <Link onClick={closeMenu} to={`${path}`}>
          {title}
        </Link>
      </li>
    );
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create-product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };
  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <div>
      <header>
        <div className="menu" onClick={toggleMenu}>
          <img src={Menu} alt="" width="30" />
        </div>
        <div className="logo">
          <h1>
            <Link to="/" onClick={closeMenu}>
              {isAdmin ? "Admin Page" : "Meow nyan Shop"}
            </Link>
          </h1>
        </div>
        <ul style={styleMenu}>
          {isAdmin ? HeaderLink("/", "Products") : HeaderLink("/", "Shop")}

          {isAdmin && adminRouter()}
          {isLogged ? loggedRouter() : HeaderLink("/login", "Login/Register")}
          <li onClick={toggleMenu}>
            <img src={Close} alt="" width="30" className="menu" />
          </li>
        </ul>
        {isAdmin ? (
          ""
        ) : (
          <div className="cart-icon">
            <span>{cart.length}</span>
            <Link
              to="#!"
              onClick={() => {
                LoginToContinue(isLogged, "/cart");
              }}
            >
              <img src={Cart} alt="" width="30" />
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
