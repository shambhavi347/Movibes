import React from "react";
import NavBar1 from "./NavBar1";
const Style = {
  textAlign: "center",
  margin: "auto",
  paddingTop: "10vh",
  padding: "auto",
  width: "100%",
  height: "100vh",
  color: "black",
  backgroundColor: "#B2BABB",
  color: "#34495E",
};
const Error = () => {
  return (
    <>
      <NavBar1 />
      <div style={Style}>
        <h1 style={({ opacity: "0.7" }, { padding: 30 })}> 404 | NOT FOUND</h1>
      </div>
    </>
  );
};

export default Error;
