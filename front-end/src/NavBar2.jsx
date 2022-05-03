import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  logo,
  logout,
  profilepic,
  chatIcon,
  frndIcon,
  movieIcon,
  share,
} from "./Image/Images";
import { v1 as uuid } from "uuid";

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
var frndStyle = {
  float: "right",
  width: "3%",
};
var logoutStyleDiv = {
  float: "right",
  height: "40px",
  width: "40px",
  objectFit: "cover",
  borderRadius: "50%",
};
var movieStyle = {
  float: "right",
  height: "40px",
  width: "40px",
  objectFit: "cover",
  borderRadius: "50%",
  margin: "0px 20px",
};
var shareStyle = {
  float: "right",
  height: "70px",
  width: "80px",
  marginTop: "-20px",
  marginRight: "-10px",
};
var profile = {
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  objectFit: "cover",
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
  // const url = "/movie-page/" + userData._id;
  const Uid = uuid();
  const url1 = `/room/${Uid}`;
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
              alt="User Profile Picture"
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
            alt="Home Page Icon"
            style={logoutStyle}
          />
        </Link>
        <Link to="/frnd-page" style={textStyle}>
          {/* <IoLogOutOutline /> */}
          <img
            className="FriendLogo"
            src={frndIcon}
            alt="Friend Icon"
            style={frndStyle}
          />
        </Link>

        <Link to="/movie-page" style={textStyle}>
          <img
            className="MovieLogo"
            src={movieIcon}
            alt="Movie Icon"
            style={movieStyle}
          />
        </Link>

        <Link to={url1} target="_blank" style={textStyle}>
          <img
            className="MovieLogo"
            src={share}
            alt="Share Tab Logo"
            style={shareStyle}
          />
        </Link>
      </nav>
    </div>
  );
};

export default NavBar2;
