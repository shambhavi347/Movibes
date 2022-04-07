import { React } from "react";
import "./Converstaions.css";
import { setConverstion } from "../Service/api";
import { profilepic } from "../Image/Images.js";

const Conversation = ({ user, sender }) => {
  console.log("USer: " + user.name);
  console.log("Sender: " + sender.name);
  const setUser = async () => {
    await setConverstion({ senderID: sender._id, receiverID: user._id });
  };
  return (
    <div className="Conversation" onClick={() => setUser()}>
      <img
        src={user.photo ? `./uploads/${user.photo}` : profilepic}
        alt="profilePic"
        className="convImage"
      />
      <span className="convText">{user.name}</span>
    </div>
  );
};

export default Conversation;
