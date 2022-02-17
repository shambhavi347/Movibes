import NavBar2 from "./NavBar2";
import NavBar1 from "./NavBar1";
import React from "react";
const NavBar = () => {
  const path = window.location.pathname;
  console.log(path);
  if (path == "/set-preference" || path == "/home-page" || path == "*")
    return <NavBar2 />;
  else return <NavBar1 />;
};

export default NavBar;
