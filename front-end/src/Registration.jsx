import React, { useState } from "react";
import profileImg from "./Image/user.jpg";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
// import { Registeration } from "./Service/api";
import { validEmail, validPassword } from "./Components/Regex";
import NavBar1 from "./NavBar1";
import axios from "axios";
const Register = () => {
  const [preview, setPreview] = useState(profileImg);
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    username: "",
    password: "",
    gender: "male",
    photo: null,
  });
  const [err, setErr] = useState("");
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    if (name === "photo") {
      setPreview(URL.createObjectURL(e.target.files[0]));
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }

    setUser({ ...user, [name]: value });
  };
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/set-preference";
    navigate(path);
  };
  const postData = async (e) => {
    e.preventDefault();

    const { email, password } = user;
    // if(user.password.length<5 || user.password.length>8)
    // {
    //  // console.log("err");
    //   window.alert("please enter password within [5-8] range");
    // }
    if (user.photo === null) {
      window.alert("please select a photo");
    } else if (
      validEmail.test(email) ||
      !user ||
      validPassword.test(password)
    ) {
      console.log("photo: " + user.photo);
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("age", user.age);
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("gender", user.gender);
      formData.append("photo", user.photo);

      //     const response = Registeration({ formData });
      //   }
      // };

      await axios
        .post("/reg", formData)
        .then((res) => {
          console.log(res);
          window.alert("Successfull Registration!!");
          console.log("Successfull Registration");
          routeChange();
        })
        .catch((err) => {
          const data = JSON.stringify(err);
          console.log(data);
          window.alert(err.response.data.message);
        });
    } else {
      setErr("Please Fill the entire form correctly");
    }
  };

  return (
    <>
      <NavBar1 />
      <div className="body">
        <div className="main">
          <h1 className="regHead">Register Yourself</h1>
          <p className="loginWelcome">
            Welcome to Movibes! Create an account and follow us on this journey
          </p>
          <div className="regBox">
            <form
              onSubmit={postData}
              method="POST"
              className="regForm"
              encType="multipart/form-data"
            >
              <input
                className="form-element"
                type="text"
                placeholder="Name..."
                name="name"
                value={user.name}
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                className="form-element"
                type="email"
                name="email"
                placeholder="Email..."
                value={user.email}
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                className="form-element"
                type="text"
                name="age"
                value={user.age}
                placeholder="Age..."
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                className="form-element"
                type="text"
                name="username"
                value={user.username}
                placeholder="Username..."
                autoComplete="off"
                onChange={handleChange}
              />
              <input
                className="form-element"
                type="password"
                name="password"
                value={user.password}
                placeholder="Password..."
                autoComplete="off"
                onChange={handleChange}
              />
              <div className="radioGroup">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={handleChange}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={handleChange}
                />
                Female
                <input
                  type="radio"
                  name="gender"
                  value="transgender"
                  checked={user.gender === "transgender"}
                  onChange={handleChange}
                />
                Transgender
              </div>
              <div className="img-holder">
                <img
                  className=" userImg"
                  src={preview}
                  alt="userimg"
                  id="customFile"
                />
                <input
                  style={{ border: 0 }}
                  className="form-element"
                  type="file"
                  accept=".png, .jpeg, .jpg "
                  name="photo"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <button className=" btn">Submit</button> <br />
              <span style={{ fontSize: "30", color: "red" }}>{err}</span>
            </form>
            <div className="img">
              {/* <img className="signupImg" src={signup} alt="signupimg" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
