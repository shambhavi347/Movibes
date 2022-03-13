import React from "react";
import "./Message.css";
import { format } from "timeago.js";
const Message = ({ message, own }) => {
  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="msgTop">
          <img
            src="https://picsum.photos/200/300 "
            alt="Profile Pic"
            className="msgImage"
          />
          <p className="msgTxt">{message.text}</p>
        </div>
        <div className="msgBottom"></div>
        {format(message.createdAt)}
      </div>
    </>
  );
};
//
export default Message;
