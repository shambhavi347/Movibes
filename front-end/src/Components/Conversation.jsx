import { React } from "react";
import "./Converstaions.css";
import { setConverstion } from "../Service/api";

const Conversation = ({ user, sender }) => {
  const setUser = async () => {
    await setConverstion({ senderID: sender._id, receiverID: user._id });
  };
  return (
    <div className="Conversation" onClick={() => setUser()}>
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
