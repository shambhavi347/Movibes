import React from "react";
import "./Converstaions.css";

const Conversation = () => {
  return (
    <div className="Conversation">
      <img
        src="https://picsum.photos/200/300"
        alt="profilePic"
        className="convImage"
      />
      <span className="convText">John Doe</span>
    </div>
  );
};

export default Conversation;
