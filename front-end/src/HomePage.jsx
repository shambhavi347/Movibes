import React, { useEffect, useState, useRef } from "react";
import NavBar2 from "./NavBar2";
import "./Home.css";
import Conversation from "./Components/Conversation";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Message from "./Components/Message/Message";
import { getFriends } from "./Service/api";
import axios from "axios";
import { io } from "socket.io-client";
import Header from "./Components/Header";

const HomePage = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserdata] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("socket send");
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    console.log(arrivalMessage);
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userData._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userData]);

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
    const fetchData = async () => {
      const data = await getFriends();
      let filteredData = data.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFriends(filteredData);
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: userData._id,
      text: newMessage,
    };

    const receiverId = currentChat?._id;

    receiverId
      ? socket.current.emit("sendMessage", {
          senderId: userData._id,
          receiverId,
          text: newMessage,
        })
      : window.alert("select receiver");
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currentChat);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <NavBar2 />
      <div className="Body">
        <div className="chatMenu">
          <div className="menuWrapper">
            <input
              placeholder="Search for friends..."
              className="menuInput"
              onChange={(e) => setText(e.target.value)}
            />
            {friends.map((friend) => (
              <div onClick={() => setCurrentChat(friend)}>
                <Conversation user={friend} sender={userData} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatMain">
          <div className="mainWrapper">
            {currentChat ? (
              <>
                <Header friend={currentChat} />
                <div className="chatTop">
                  {messages.map((m) => (
                    <>
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === userData._id} />
                      </div>
                    </>
                  ))}
                </div>
                <div className="chatBottom">
                  <textarea
                    className="chatInput"
                    placeholder="Write Something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button className="chatSend" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConvo">Open a Conversation</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
