import React, { useState, useEffect } from "react";
import NavBar2 from "./NavBar2";
import { profilepic } from "./Image/Images";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState("");
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  const callProfilePage = async () => {
    try {
      const res = await fetch("/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res, error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      routeChange();
    }
  };
  useEffect(() => {
    callProfilePage();
  }, []);

  return (
    <>
      <NavBar2 />
      <div className="box">
        <h1 className="hi">Profile Page</h1>
        <div className="page">
          <div className="pic">
            <img className="abtImg" src={profilepic} alt="singninimg" />

            <button className="editBtn">Edit Profile</button>
            <button className="editBtn">Delete Profile</button>
          </div>
          <div className="details">
            <p className="pDeets">
              Name:<span className="items">{userData.name}</span> <br />
            </p>
            <p className="pDeets">
              Username:<span className="items">{userData.username}</span>
            </p>
            <p className="pDeets">
              Email ID:
              <span className="items">{userData.email}</span>
            </p>
            <p className="pDeets">
              Gender:<span className="items">{userData.gender}</span>
              Age:<span className="items">{userData.age}</span>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="body">
        <div className="main">
          <h1 className="regHead">
            <h1>Profile</h1>
          </h1>
          <div className="proBox">
            <form method="GET" className="proForm">
              <h2>
                Username &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {userData.name}{" "}
              </h2>
              <h2>
                Age &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {userData.age}{" "}
              </h2>
              <h2>
                Gender &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {userData.gender}{" "}
              </h2>
            </form>
          </div>
          <div className="Img">
            <img className="proImg" src={userData.photo} alt="singninimg" />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Profile;
