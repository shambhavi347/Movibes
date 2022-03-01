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
    console.log();
    let count = 0;
    if (prefernce.action == 1) count++;
    if (SetPreference.animated == 1) count++;
    if (SetPreference.comedy == 1) count++;
    if (SetPreference.drama == 1) count++;
    if (SetPreference.musical == 1) count++;
    if (SetPreference.mystery == 1) count++;
    if (SetPreference.romance == 1) count++;
    if (SetPreference.scifi == 1) count++;
    if (SetPreference.thriller == 1) count++;

    if (count < 5) {
      window.alert("Select minimum 5 ");
    } else {
      window.alert("good to go  ");
    }

    // if (e.target.checked < 5) {
    //   window.alert("Select minimum 5 ");
    // } else {
    //   window.alert("good to go  ");
    // }
  };
  return (
    <h1>
      <div className="body">
        <div className="main">
          <h1 className="regHead">
            Set Preference
            <div class="regBox">
              <form action="POST" className="regForm">
                <div class="movie action">
                  <label>
                    <input
                      type="checkbox"
                      value="1"
                      name="action"
                      checked={prefernce.action === "1"}
                      onChange={handleChange}
                      onClick={chkcontrol(0)}
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
                      onClick={chkcontrol(1)}
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
                      onClick={chkcontrol(2)}
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
                      onClick={chkcontrol(3)}
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
                      onClick={chkcontrol(4)}
                    />
                    <span>Musical</span>
                  </label>
                </div>

                <div class="movie mystery">
                  <label>
                    <input
                      type="checkbox"
                      name="mystery"
                      value="1"
                      checked={prefernce.mystery === "1"}
                      onChange={handleChange}
                      onClick={chkcontrol(5)}
                    />
                    <span>Mystery</span>
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
                      onClick={chkcontrol(6)}
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
                      onClick={chkcontrol(7)}
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
                      onClick={chkcontrol(8)}
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
              </form>
            </div>
          </h1>
        </div>
      </div>
    </h1>
  );
};

export default SetPreference;
