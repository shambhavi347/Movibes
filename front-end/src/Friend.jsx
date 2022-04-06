import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "./NavBar2";
import Requests from "./Components/Requests/Requests";
import Pending from "./Components/Pending/Pending";
import "./Friend.css";
import { getRequests, getPending, getSuggested } from "./Service/api";
import { profilepic } from "./Image/Images";

const Friend = () => {
  const [display, setDisplay] = useState(true);
  const [request, setRequest] = useState([]);
  const [pending, setPending] = useState([]);
  const [suggested, setSuggested] = useState([]);
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
      console.log(data);
      setSuggested(data);
      console.log(suggested);
      if (!data) {
        console.log("data not found");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
    // const data = await getSuggested();
    // console.log("Suggested: " + suggested);
    // console.log("Data: " + data);
    // setSuggested(data);
  }, []);

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
              {/* <Requests /> <Requests /> <Requests /> */}
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
          <div className="Poloroid">
            <div className="photo">
              {/* <img src={profilepic} alt="profile pic" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friend;
