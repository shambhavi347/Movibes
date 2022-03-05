//import React from "react";
import React, { useState } from "react";
import signin from "./Image/sign-in.png";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/home-page";
    <NavBar2 />;
    navigate(path);
  };
  const postData = async (e) =>{
    e.preventDefault();

    const res = await fetch('/', {
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
  }  
  else
  {
    window.alert("Successfull Login!!");
    console.log("Successfull Login");
    routeChange();
  }

  };
  // const formSubmit = (e) => {
  //   e.preventDefault();
  //   routeChange();
  // };
  return (
    <>
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
              <button className="form-element" className="btn" onClick={postData}>
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
