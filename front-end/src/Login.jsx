import React from "react";
import signin from "./Image/sign-in.png";
const Login = () => {
  return (
    <>
      <div className="body">
        <div className="main" id="main">
          <h1 className="regHead">Login</h1>
          <p className="loginWelcome">
            Welcome! Login to your account and get started
          </p>
          <div className="regBox">
            <form className="regForm">
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
                type="text"
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
