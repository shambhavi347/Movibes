import React from "react";
import { reject, profilepic } from "../../Image/Images";
import { cancelFrn } from "../../Service/api";

const Pending = ({ user }) => {
  const handleReject = async () => {
    const data = await cancelFrn({ friendID: user._id });
    console.log(data);
  };

  return (
    <div id="req" className="Request">
      <img
        src={user.photo ? `./uploads/${user.photo}` : profilepic}
        alt="profilePic"
        className="reqImage"
      />
      <span className="convText" style={{ width: "160px" }}>
        {user.name}
      </span>
      <div className="ans">
        <button className="resBtn" onClick={() => handleReject()}>
          <img
            className="response"
            src={reject}
            alt=""
            style={{ marginRight: "-60px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Pending;
