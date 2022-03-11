import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar1 from "./NavBar1";
const SetPreference = () => {
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

  const handleCount = (e) => {
    if (e.target.checked) {
      setCount(count + 1);
      setPreference({ ...preference, [e.target.name]: e.target.value });
    } else {
      setCount(count - 1);
      setPreference({ ...preference, [e.target.name]: 0 });
    }
  };
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (count < 5) {
      window.alert("Select minimum 5 ");
    } else {
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
      const res = await fetch("/set-preference", {
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
        routeChange();
      }
    }
  };
  return (
    <>
      <NavBar1 />
      <div className="body">
        <div className="main">
          <h1 id="mHead" className="regHead">
            Set Preference
          </h1>
          <div className="regBox" id="genere">
            <form action="POST" className="regForm">
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
              <div className="movie3">
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

              <button className="btn" id="mbtn" onClick={onSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPreference;
