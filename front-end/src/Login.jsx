//import React from "react";
import React, { useState } from "react";
import { signin } from "./Image/Images";
import { useNavigate } from "react-router-dom";
import NavBar1 from "./NavBar1";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/home-page";
    navigate(path);
  };
  const postData = async (e) => {
    e.preventDefault();

    const res = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    if (data.status === 400 || !data) {
      window.alert("Invalid Login!!");
      console.log("Invalid Login");
    } else {
      window.alert("Successfull Login!!");
      console.log("Successfull Login");
      routeChange();
    }
  };
  return (
    <>
      <NavBar1 />
      <div className="body">
        <div className="main" id="main">
          <h1 className="regHead">Login</h1>
          <p className="loginWelcome">
            Welcome! Login to your account and get started
          </p>
          <div className="regBox">
            <form method="POST" className="regForm">
              <input
                className="form-element"
                placeholder="Username..."
                type="text"
                name="username"
                value={username}
                id=""
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="form-element"
                placeholder="Password..."
                type="password"
                name="password"
                value={password}
                id=""
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className=" btn" onClick={postData}>
                Login
              </button>
            </form>
            <div className="Img">
              <img className="signupImg" src={signin} alt="singninimg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
