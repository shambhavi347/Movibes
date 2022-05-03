import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";
import Requests from "./Components/Requests/Requests";
import Pending from "./Components/Pending/Pending";
import "./Friend.css";
import {
  getRequests,
  getPending,
  getProfile,
  sendRequest,
} from "./Service/api";
import { profilepic } from "./Image/Images";

const Friend = () => {
  const [display, setDisplay] = useState(true);
  const [request, setRequest] = useState([]);
  const [pending, setPending] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [message, setMessage] = useState("Loading...");
  const [count, setCount] = useState(0);
  const [profile, setProfile] = useState([]);
  const [userData, setUserdata] = useState([]);

  const navigate = useNavigate();

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

  useEffect(async () => {
    callHome();
    const data = await getRequests();
    setRequest(data);
  }, [request]);

  useEffect(async () => {
    const data = await getPending();
    setPending(data);
  }, [pending]);

  let Arr = [];
  let len = 0;
  useEffect(async () => {
    try {
      const res = await fetch("/suggeted-frn", {
        method: "GET",
        headers: {
          "Content-Type": "appllication/json",
          Accept: "application/json",
        },
        Credential: "include ",
      });
      const data = await res.json();

      // console.log(data);
      Arr = data;
      len = Arr.length;
      // console.log(len);
      if (count === 0) {
        const data1 = await getProfile({ ID: Arr[0] });
        setProfile(data1);
      }
      console.log("Array: " + Arr);
      setSuggested(data);
      // Arr = Array.from(suggested).map((frnd) => ({ frnd }));

      console.log(suggested);
      if (!data) {
        console.log("data not found");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  }, []);

  useEffect(async () => {
    // var i = 0;
    Arr = suggested;

    const data = await getProfile({ ID: Arr[count] });
    console.log(data);
    setProfile(data);
  }, [count]);
  const handleResponse = () => {
    console.log("Clicked");
    setCount(count + 1);
    if (count >= len) {
      setMessage("Refresh the page!!");
    }
  };
  const handleYesResponse = async (friendID) => {
    setCount(count + 1);
    if (count >= len) {
      setMessage("Refresh the page!!");
    }
    const data = await sendRequest({ ID: friendID });
    window.alert(data.message);

    console.log("Clicked");
    setCount(count + 1);
  };

  return (
    <>
      <NavBar2 />
      <div className="Body">
        <div className="chatMenu">
          <button className="toggle" onClick={() => setDisplay(true)}>
            Request List
          </button>
          <button className="toggle" onClick={() => setDisplay(false)}>
            Pending Request
          </button>
          {display ? (
            <>
              {request.map((req) => (
                <Requests user={req} />
              ))}
            </>
          ) : (
            <>
              {pending.map((req) => (
                <Pending user={req} />
              ))}
            </>
          )}
        </div>
        <div className="chatMain" id="frndMenu">
          <h1 className="heading">Suggested Friends</h1>
          {profile ? (
            <div className="Poloroid">
              <div className="photo">
                <img
                  className="frnPic"
                  src={
                    profile.photo ? `./uploads/${profile.photo}` : profilepic
                  }
                  alt="profile pic"
                />
                <div className="Name">{profile.name}</div>
                <div className="Buttons">
                  <button
                    id="tick"
                    className="btns"
                    onClick={() => handleYesResponse(profile._id)}
                  >
                    Yess
                  </button>
                  <button
                    id="wrong"
                    className="btns"
                    onClick={() => handleResponse()}
                  >
                    Nope
                  </button>
                </div>
                {/* <img src={profilepic} alt="profile pic" /> */}
              </div>
            </div>
          ) : (
            <div id="message" className="noConvo">
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Friend;
