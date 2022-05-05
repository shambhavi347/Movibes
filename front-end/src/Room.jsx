import React, { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { form } from "./Image/Images";
import io from "socket.io-client";
import "./Room.css";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Feedback from "./Feedback";
const Room = (props) => {
  const userVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const senders = useRef([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [preference, setPreference] = useState({
    action: 0,
    animated: 0,
    comedy: 0,
    drama: 0,
    musical: 0,
    mystery: 0,
    romance: 0,
    sci_fi: 0,
    thriller: 0,
  });

  searchParams.get("id");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCount = (e) => {
    if (e.target.checked) {
      setCount(count+1);
      setPreference({ ...preference, [e.target.name]: e.target.value });
    } else {
      setPreference({ ...preference, [e.target.name]: 0 });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      action,
      animated,
      comedy,
      drama,
      musical,
      mystery,
      romance,
      sci_fi,
      thriller,
    } = preference;
    const res = await fetch("/update-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        action,
        animated,
        comedy,
        drama,
        musical,
        mystery,
        romance,
        sci_fi,
        thriller,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Preference Selection!!");
      console.log("Invalid Preference Selection");
    } else {
      window.alert("Successfull Preference Selection!!");
      console.log("Successfull Preference Selection");
      setOpen(false);
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect("/");
        socketRef.current.emit("join room", searchParams);

        socketRef.current.on("other user", (userID) => {
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("user joined", (userID) => {
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleRecieveCall);

        socketRef.current.on("answer", handleAnswer);

        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
      });
  }, []);

  function callUser(userID) {
    peerRef.current = createPeer(userID);
    userStream.current
      .getTracks()
      .forEach((track) =>
        senders.current.push(
          peerRef.current.addTrack(track, userStream.current)
        )
      );
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current)
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const screenTrack = stream.getTracks()[0];
      senders.current
        .find((sender) => sender.track.kind === "video")
        .replaceTrack(screenTrack);
      screenTrack.onended = function () {
        senders.current
          .find((sender) => sender.track.kind === "video")
          .replaceTrack(userStream.current.getTracks()[1]);
      };
    });
  }

  return (
    <div className="room">
      <div className="bar">
        <div className="formDiv">
          <button className="form">
            <img
              className="formImg"
              src={form}
              alt="form button"
              onClick={handleClickOpen}
            />
          </button>
        </div>
        <div className="headDiv">
          <h1 className="head">Room Page</h1>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="DialogT">Feedback Form</DialogTitle>
        <DialogContent>
          <DialogContentText className="DialogC">
            <form action="POST" className="regForm" id="feedFrm">
              <div className="movie1">
                <div className="movie action">
                  <label>
                    <input
                      type="checkbox"
                      value="1"
                      name="action"
                      onChange={handleCount}
                    />
                    <span>Action</span>
                  </label>
                </div>

                <div className="movie animated">
                  <label>
                    <input
                      type="checkbox"
                      name="animated"
                      value="1"
                      onChange={handleCount}
                    />
                    <span>Animated</span>
                  </label>
                </div>

                <div className="movie comedy">
                  <label>
                    <input
                      type="checkbox"
                      name="comedy"
                      value="1"
                      onChange={handleCount}
                    />
                    <span>Comedy</span>
                  </label>
                </div>
              </div>
              <div className="movie2">
                <div className="movie drama">
                  <label>
                    <input
                      type="checkbox"
                      name="drama"
                      value="1"
                      onChange={handleCount}
                    />
                    <span>Drama</span>
                  </label>
                </div>

                <div className="movie musical">
                  <label>
                    <input
                      type="checkbox"
                      name="musical"
                      value="1"
                      onChange={handleCount}
                    />
                    <span>Musical</span>
                  </label>
                </div>

                <div className="movie mystery">
                  <label>
                    <input
                      type="checkbox"
                      name="mystery"
                      value="1"
                      onChange={handleCount}
                    />
                    <span>Mystery</span>
                  </label>
                </div>
              </div>
              <div className="mvi">
                <div className="movie romance">
                  <label>
                    <input
                      type="checkbox"
                      name="romance"
                      value="1"
                      onChange={handleCount}
                    />
                    <span>Romance</span>
                  </label>
                </div>
                <div className="movie sci-fi">
                  <label>
                    <input
                      type="checkbox"
                      name="sci_fi"
                      value="1"
                      onChange={handleCount}
                    />
                    <span>Sci-fi</span>
                  </label>
                </div>
                <div className="movie thriller">
                  <label>
                    <input
                      type="checkbox"
                      name="thriller"
                      value="1"
                      onChange={handleCount}
                    />
                    <span>Thriller</span>
                  </label>
                </div>
              </div>

              <button className="btn" id="bbtn">
                Submit
              </button>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="closeBtn" onClick={handleClose} color="primary">
            Close
          </button>
          <button
            className="closeBtn"
            onClick={handleSubmit}
            color="primary"
            autoFocus
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
      <div className="vdoDiv">
        <div className="vdo">
          <video
            className="videoHost"
            controls
            style={{ height: 500, width: 600 }}
            autoPlay
            ref={userVideo}
          />
          <video
            className="videoPart"
            controls
            style={{ height: 500, width: 600 }}
            autoPlay
            ref={partnerVideo}
          />
        </div>
        <div className="Share">
          <button className="btnShare" onClick={shareScreen}>
            Share screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
