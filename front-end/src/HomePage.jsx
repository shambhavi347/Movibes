import React from "react";
import NavBar2 from "./NavBar2";
import "./Home.css";
import Conversation from "./Components/Conversation";
import Message from "./Components/Message/Message";
const HomePage = () => {
  return (
    <>
      <NavBar2 />
      <div className="Body">
        <div className="chatMenu">
          <div className="menuWrapper">
            <input placeholder="Search for friends..." className="menuInput" />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatMain">
          <div className="mainWrapper">
            <div className="chatTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message own={true} />
              <Message own={true} />
              <Message own={true} />
            </div>
            <div className="chatBottom">
              <textarea
                className="chatInput"
                placeholder="Write Something..."
              />
              <button className="  chatSend">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
