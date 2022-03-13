import React, { useEffect, useState } from "react";
import NavBar2 from "./NavBar2";
import "./Home.css";
import Conversation from "./Components/Conversation";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Message from "./Components/Message/Message";
import { getFriends } from "./Service/api";

const HomePage = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserdata] = useState();
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
      console.log(data);
      setUserdata(data);
      // console.log(userData.name);
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
    const fetchData = async () => {
      const data = await getFriends();
      setFriends(data);
      console.log(friends);
    };
    fetchData();
  }, []);
  return (
    <>
      <NavBar2 />
      <div className="Body">
        <div className="chatMenu">
          <div className="menuWrapper">
            <input placeholder="Search for friends..." className="menuInput" />
            {friends.map((friend) => (
              <Conversation user={friend} />
            ))}
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
