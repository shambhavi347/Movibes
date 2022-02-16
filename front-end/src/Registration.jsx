import React, { useState } from "react";
import profileImg from "./Image/user.jpg";
import signup from "./Image/sign-up.png";
import "./Registration.css";
const Register = () => {
  const [preview, setPreview] = useState(profileImg);
  const [gender, setGender] = useState("male");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleImage = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (password && email && name && age && gender && preview && username) {
      console.log("Login");
    } else {
      alert("Please fill entire form!");
    }
  };

  return (
    <div className="body">
      <div className="main">
        <h1 className="regHead">Registration Page</h1>
        <div className="regBox">
          <form className="regForm" onSubmit={formSubmit}>
            <input
              className="form-element"
              type="text"
              placeholder="Name..."
              name="name"
              id=""
              autoComplete="off"
              onChange={handleName}
            />
            <input
              className="form-element"
              type="email"
              placeholder="Email..."
              name="email"
              autoComplete="off"
              onChange={handleEmail}
            />

            <input
              className="form-element"
              type="text"
              name="age"
              placeholder="Age..."
              id=""
              onChange={handleAge}
            />
            <input
              className="form-element"
              type="text"
              name="username"
              placeholder="Username..."
              id=""
              autoComplete="off"
              onChange={handleUsername}
            />
            <input
              className="form-element"
              type="password"
              name="password"
              placeholder="Password..."
              id=""
              autoComplete="off"
              onChange={handlePassword}
            />

            <div className="radioGroup">
              <input
                type="radio"
                name="male"
                value="male"
                checked={gender === "male"}
                onChange={handleGender}
              />
              Male
              <input
                type="radio"
                name="female"
                value="female"
                checked={gender === "female"}
                onChange={handleGender}
              />
              Female
              <input
                type="radio"
                name="third"
                value="third"
                checked={gender === "third"}
                onChange={handleGender}
              />
              Third Gender
            </div>
            <div className="img-holder">
              <img
                className="form-element"
                className="userImg"
                src={preview}
                alt="userimg"
                id="customFile"
              />
              <input
                style={{ border: 0 }}
                className="form-element"
                type="file"
                accept="image/*"
                name="Image"
                autoComplete="off"
                onChange={handleImage}
              />
            </div>
            <button className="form-element" className="btn">
              Submit
            </button>
          </form>
          <div className="img">
            <img className="signupImg" src={signup} alt="signupimg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
