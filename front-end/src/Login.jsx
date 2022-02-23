import React from "react";
import signin from "./Image/sign-in.png";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";
const Login = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/home-page";
    <NavBar2 />;
    navigate(path);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    routeChange();
  };
  return (
    <>
      <div className="body">
        <div className="main" id="main">
          <h1 className="regHead">Login</h1>
          <p className="loginWelcome">
            Welcome! Login to your account and get started
          </p>
          <div className="regBox">
            <form onSubmit={formSubmit} className="regForm">
              <input
                autoComplete="off"
                className="form-element"
                placeholder="Username..."
                type="text"
                name="username"
                id=""
              />
              <input
                autoComplete="off"
                className="form-element"
                placeholder="Password..."
                type="password"
                name="password"
                id=""
              />
              <button className="form-element" className="btn">
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
