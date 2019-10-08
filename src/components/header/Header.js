import React from "react";
import logo from "../../img/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="container">
      <img src={logo} alt="" className="logo" />
    </div>
  );
};

export default Header;
