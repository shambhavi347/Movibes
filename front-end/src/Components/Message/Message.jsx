import React from "react";
import "./Message.css";
import { format } from "timeago.js";
import { profilepic } from "../../Image/Images.js";

const Message = ({ message, own, user, photo }) => {
  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="msgTop">
          {own ? (
            <img
              src={user ? `./uploads/${user}` : profilepic}
              alt="Profile Pic"
              className="msgImage"
            />
          ) : (
            <img
              src={photo ? `./uploads/${photo}` : profilepic}
              alt="Profile Pic"
              className="msgImage"
            />
          )}
          <p className="msgTxt">{message.text}</p>
        </div>
        <div className="msgBottom"></div>
        {format(message.createdAt)}
      </div>
    </>
  );
};

export default Message;
