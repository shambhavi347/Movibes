import React from "react";
import "./Message.css";
const Message = ({ own }) => {
  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="msgTop">
          <img
            src="https://picsum.photos/200/300 "
            alt="Profile Pic"
            className="msgImage"
          />
          <p className="msgTxt">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="msgBottom">1 hour ago</div>
      </div>
    </>
  );
};

export default Message;
