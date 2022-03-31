import React from "react";
import { Link } from "react-router-dom";
import { logo, logout, profilepic, chatIcon, frndIcon } from "./Image/Images";

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
var logoutStyle = {
  float: "right",
  width: "3%",
  margin: "0px 20px",
};
const NavBar2 = () => {
  return (
    <div className="container" style={Style}>
      <nav>
        <img className="logo" src={logo} alt="Website Logo" style={logoStyle} />

        <Link to="/logout" style={textStyle}>
          {/* <IoLogOutOutline /> */}
          <img
            className="logout"
            src={logout}
            alt="Website Logo"
            style={logoutStyle}
          />
        </Link>
        <Link to="/profile" style={textStyle}>
          {/* <IoLogOutOutline /> */}
          <img
            className="profile"
            src={profilepic}
            alt="Website Logo"
            style={logoutStyle}
          />
        </Link>

        <Link to="/home-page" style={textStyle}>
          {/* <IoLogOutOutline /> */}
          <img
            className="HomePage"
            src={chatIcon}
            alt="Website Logo"
            style={logoutStyle}
          />
        </Link>
        <Link to="/frnd-page" style={textStyle}>
          {/* <IoLogOutOutline /> */}
          <img
            className="HomePage"
            src={frndIcon}
            alt="Website Logo"
            style={logoutStyle}
          />
        </Link>
      </nav>
    </div>
  );
};

export default NavBar2;
