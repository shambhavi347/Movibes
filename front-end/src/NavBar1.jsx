import React from "react";
import { Link } from "react-router-dom";
import { logo } from "./Image/Images";

var Style = {
  position: "fixed",
  boxShadow: "2px 3px 5px #0f1622",
  width: "100%",
  height: "8vh",
  backgroundColor: "#213455",
  textAlign: "right",
  float: "left",
  padding: "8px 14px",
};
var textStyle = {
  padding: 20,
  textDecoration: "none",
  fontSize: 22,
  color: "white",
};
var logoStyle = {
  padding: 0,
  margin: 0,
  float: "left",
  width: "10%",
};
const NavBar1 = () => {
  return (
    <div className="container" style={Style}>
      <nav>
        <img className="logo" src={logo} alt="Website Logo" style={logoStyle} />
        <Link to="/" style={textStyle}>
          Login
        </Link>

        <Link to="/reg" style={textStyle}>
          Register
        </Link>
      </nav>
    </div>
  );
};

export default NavBar1;
