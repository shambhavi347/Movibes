import React from "react";
import { Link } from "react-router-dom";

var Style = {
  position: "fixed",
  boxShadow: "2px 5px 5px #888888",
  width: "100%",
  height: "8vh",
  backgroundColor: "#34495E",
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
const NavBar1 = () => {
  return (
    <div className="container" style={Style}>
      <nav>
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
