import React from "react";
import { useNavigate } from "react-router-dom";
import "./FProfile.css";
import { profilepic } from "../Image/Images";
import { deleteFriend } from "../Service/api";
const FProfile = ({ user }) => {
  let navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const data = await deleteFriend({ friendID: user._id });
      navigate("/home-page");
      window.alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bdy">
        <div className="pic">
          <img
            className="abtImg"
            src={user.photo ? `./uploads/${user.photo}` : profilepic}
            alt="profile pic"
          />
        </div>
        <div className="dtls">
          <p className="pDeets">
            Name:<span className="items">{user.name}</span> <br />
          </p>
          <p className="pDeets">
            Username:<span className="items">{user.username}</span>
          </p>
          <p className="pDeets">
            Email ID:
            <span className="items">{user.email}</span>
          </p>
          <p className="pDeets">
            Gender:<span className="items">{user.gender}</span>
            Age:<span className="items">{user.age}</span>
          </p>
          <button className="btn" onClick={() => handleDelete()}>
            Delete Friend
          </button>
        </div>
      </div>
    </>
  );
};

export default FProfile;
