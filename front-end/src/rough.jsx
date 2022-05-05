import React, { useState, useEffect } from "react";
import { logo, profilepic } from "./Image/Images";
//import
const rough = () => {
  //function ...
  const [name, setFirst] = useState("hey");
  const clickbtn = () => {
    if (name === "hey") setFirst("Neha");
    else setFirst("hey");
  };
  useEffect(() => {
    first;
  }, []);

  return (
    <>
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <button onClick={clickbtn}></button>
      <div> hello {name}</div>
      <a href=""></a>
      <img src="" alt="" />
    </>
  );
};

export default rough;
