import React from "react";

const Feedback = () => {
  return (
    <>
      <form action="POST" className="regForm" id="feedFrm">
        <div className="movie1">
          <div className="movie action">
            <label>
              <input type="checkbox" value="1" name="action" />
              <span>Action</span>
            </label>
          </div>

          <div className="movie animated">
            <label>
              <input type="checkbox" name="animated" value="1" />
              <span>Animated</span>
            </label>
          </div>

          <div className="movie comedy">
            <label>
              <input type="checkbox" name="comedy" value="1" />
              <span>Comedy</span>
            </label>
          </div>
        </div>
        <div className="movie2">
          <div className="movie drama">
            <label>
              <input type="checkbox" name="drama" value="1" />
              <span>Drama</span>
            </label>
          </div>

          <div className="movie musical">
            <label>
              <input type="checkbox" name="musical" value="1" />
              <span>Musical</span>
            </label>
          </div>

          <div className="movie mystery">
            <label>
              <input type="checkbox" name="mystery" value="1" />
              <span>Mystery</span>
            </label>
          </div>
        </div>
        <div className="mvi">
          <div className="movie romance">
            <label>
              <input type="checkbox" name="romance" value="1" />
              <span>Romance</span>
            </label>
          </div>
          <div className="movie sci-fi">
            <label>
              <input type="checkbox" name="sci_fi" value="1" />
              <span>Sci-fi</span>
            </label>
          </div>
          <div className="movie thriller">
            <label>
              <input type="checkbox" name="thriller" value="1" />
              <span>Thriller</span>
            </label>
          </div>
        </div>
      </form>
    </>
  );
};

export default Feedback;
