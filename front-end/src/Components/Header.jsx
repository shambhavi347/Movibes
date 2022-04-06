import React from "react";
import { profilepic } from "../Image/Images.js";

var Style = {
  position: "fixed",
  boxShadow: "2px 3px 5px #0f1622",
  width: "70.35%",
  height: "8vh",
  backgroundColor: "#405f94",
  color: "white",
  marginLeft: "-10px",
  marginTop: "-10px",
  borderRadius: "5px",
};
var nameStyle = {
  fontSize: "larger",
};
var convImage = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  objectFit: "cover",
  marginRight: "20px",
  marginLeft: "20px",
  marginTop: "5px",
  marginBottom: "-10px",
};

const Header = ({ friend }) => {
  console.log(friend);
  return (
    <div className="container" style={Style}>
      <img
        src={friend.photo ? `./uploads/${friend.photo}` : profilepic}
        alt="profilepic"
        style={convImage}
      />
      <span className="name" style={nameStyle}>
        {friend.name}
      </span>
    </div>
  );
};

export default Header;
