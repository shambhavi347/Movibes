import React from "react";
import { reject } from "../../Image/Images";
const Pending = ({ user }) => {
  return (
    <div id="req" className="Request">
      <img
        src="https://picsum.photos/200/300"
        alt="profilePic"
        className="reqImage"
      />
      <span className="convText" style={{ width: "160px" }}>
        {user.name}
      </span>
      <div className="ans">
        <button
          className="resBtn"
          onClick={() => console.log("reject clicked")}
        >
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
