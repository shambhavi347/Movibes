import React from "react";
import { accept, reject, profilepic } from "../../Image/Images";
import "./Requests.css";
import { acceptFrn, rejectFrn } from "../../Service/api";
const Requests = ({ user }) => {
  // console.log(user);
  const handleAccept = async () => {
    const data = await acceptFrn({ friendID: user._id });
    // console.log(data);
  };
  const handleReject = async () => {
    const data = await rejectFrn({ friendID: user._id });
    console.log(data);
  };
  return (
    <div id="req" className="Request">
      <img
        src={user.photo ? `./uploads/${user.photo}` : profilepic}
        alt="profilePic"
        className="reqImage"
      />
      <span className="convText">{user.name}</span>
      <div className="ans">
        <button className="resBtn" onClick={() => handleAccept()}>
          <img className="response" src={accept} alt="" />
        </button>
        <button className="resBtn" onClick={() => handleReject()}>
          <img className="response" src={reject} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Requests;
