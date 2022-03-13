import React from "react";
import "./Converstaions.css";

const Conversation = ({ user }) => {
  return (
    <div className="Conversation">
      <img
        src="https://picsum.photos/200/300"
        alt="profilePic"
        className="convImage"
      />
      <span className="convText">{user.name}</span>
    </div>
  );
};

export default Conversation;
