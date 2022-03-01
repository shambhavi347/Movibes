import React, { useState } from "react";

const SetPreference = () => {
  const [prefernce, setPreference] = useState({
    action: 0,
    animated: 0,
    comedy: 0,
    drama: 0,
    musical: 0,
    mystery: 0,
    romance: 0,
    scifi: 0,
    thriller: 0,
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPreference({ ...prefernce, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (e.target.checked > 5) {
      window.alert("Select minimum 5 ");
    } else {
      window.alert("good to go  ");
    }
  };
  return (
    <h1>
      <div className="body">
        <div className="main">
          <h1 className="regHead">
            Set Preference
            <div class="regBox">
              <div class="movie action">
                <label>
                  <input
                    type="checkbox"
                    value="1"
                    name="action"
                    checked={prefernce.action === "1"}
                    onChange={handleChange}
                  />
                  <span>Action</span>
                </label>
              </div>

              <div class="movie animated">
                <label>
                  <input
                    type="checkbox"
                    name="animated"
                    value="1"
                    checked={prefernce.animated === "1"}
                    onChange={handleChange}
                  />
                  <span>Animated</span>
                </label>
              </div>

              <div class="movie comedy">
                <label>
                  <input
                    type="checkbox"
                    name="comedy"
                    value="1"
                    checked={prefernce.comedy === "1"}
                    onChange={handleChange}
                  />
                  <span>Comedy</span>
                </label>
              </div>

              <div class="movie drama">
                <label>
                  <input
                    type="checkbox"
                    name="drama"
                    value="1"
                    checked={prefernce.drama === "1"}
                    onChange={handleChange}
                  />
                  <span>Drama</span>
                </label>
              </div>

              <div class="movie musical">
                <label>
                  <input
                    type="checkbox"
                    name="musical"
                    value="1"
                    checked={prefernce.musical === "1"}
                    onChange={handleChange}
                  />
                  <span>Musical</span>
                </label>
              </div>

              <div class="movie mystrey">
                <label>
                  <input
                    type="checkbox"
                    name="mystrey"
                    value="1"
                    checked={prefernce.mystery === "1"}
                    onChange={handleChange}
                  />
                  <span>Mystrey</span>
                </label>
              </div>
              <div class="movie romance">
                <label>
                  <input
                    type="checkbox"
                    name="romance"
                    value="1"
                    checked={prefernce.romance === "1"}
                    onChange={handleChange}
                  />
                  <span>Romance</span>
                </label>
              </div>
              <div class="movie sci-fi">
                <label>
                  <input
                    type="checkbox"
                    name="scifi"
                    value="1"
                    checked={prefernce.scifi === "1"}
                    onChange={handleChange}
                  />
                  <span>Sci-fi</span>
                </label>
              </div>
              <div class="movie thriller">
                <label>
                  <input
                    type="checkbox"
                    name="thriller"
                    value="1"
                    checked={prefernce.thriller === "1"}
                    onChange={handleChange}
                  />
                  <span>Thriller</span>
                </label>
              </div>
              <button
                className="form-element"
                className="btn"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </h1>
        </div>
      </div>
    </h1>
  );
};

export default SetPreference;
