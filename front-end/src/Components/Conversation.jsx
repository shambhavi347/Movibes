import { React } from "react";
import "./Converstaions.css";
import { setConverstion } from "../Service/api";
import { profilepic } from "../Image/Images.js";

const Conversation = ({ user, sender }) => {
  const setUser = async () => {
    await setConverstion({ senderID: sender._id, receiverID: user._id });
  };
  // {friends.map((friend, key) => (
  //   <div className="Conversation" onClick={() => setUser(friend)}>
  //     <img
  //       src={friend.photo ? `./uploads/${friend.photo}` : profilepic}
  //       alt="profilePic"
  //       className="convImage"
  //     />
  //     <div
  //       className="textDiv"
  //       onClick={() => {
  //         setCurrentChat(friend);
  //         friend.photo
  //           ? setCurrentPhoto(friend.photo)
  //           : setCurrentPhoto(null);
  //       }}
  //     >
  //       <span className="convText">{friend.name}</span>
  //     </div>
  //   </div>
  // ))}
  // {frnds.map((friend, key) => (
  //   <div className="Conversation" onClick={() => setUser(friend)}>
  //     <img
  //       src={friend.photo ? `./uploads/${friend.photo}` : profilepic}
  //       alt="profilePic"
  //       className="convImage"
  //     />
  //     <div
  //       className="textDiv"
  //       onClick={() => {
  //         setCurrentChat(friend);
  //         friend.photo
  //           ? setCurrentPhoto(friend.photo)
  //           : setCurrentPhoto(null);
  //       }}
  //     >
  //       <span className="convText">{friend.name}</span>
  //     </div>
  //   </div>
  // ))}
  {
    /* <div
                onClick={() => {
                  setCurrentChat(friend);
                  friend.photo
                    ? setCurrentPhoto(friend.photo)
                    : setCurrentPhoto(null);
                }}
              >
                <Conversation user={friend} sender={userData} />
               */
  }
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
