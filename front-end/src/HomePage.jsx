import React, { useEffect, useState } from "react";
import NavBar2 from "./NavBar2";
import "./Home.css";
import Conversation from "./Components/Conversation";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Message from "./Components/Message/Message";
const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState({});
  const callHome = async () => {
    try {
      const res = await fetch("/home-page", {
        method: "GET",
        headers: {
          "Content-Type": "appllication/json",
          Accept: "application/json",
        },
        Credential: "include ",
      });
      const data = await res.json();

      setUserdata(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };
  useEffect(() => {
    callHome();
  }, []);
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
