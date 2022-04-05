import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
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
var logoutStyleDiv = {
  float: "right",
  height: "40px",
  width: "40px",
  objectFit: "cover",
  color: "black",
  borderRadius: "50%",
};
var profile = {
  height: "40px",
  width: "40px",
  borderRadius: "50%",
};
const NavBar2 = () => {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const res = await fetch("/home-page", {
        method: "GET",
        headers: {
          "Content-Type": "appllication/json",
          Accept: "application/json",
        },
        Credential: "include ",
      });
      const data = await res.json();
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }, []);

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
          <div style={logoutStyleDiv}>
            <img
              className="profile"
              src={userData.photo ? `./uploads/${userData.photo}` : profilepic}
              alt="Website Logo"
              style={profile}
              // style={logoutStyle}
            />
          </div>
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
