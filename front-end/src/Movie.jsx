import React from "react";
import SearchBar from "./Components/Searchbar";
import NavBar2 from "./NavBar2";
import youtube from "./Service/Youtube";
import VideoList from "./Components/VideoList";
import VideoDetail from "./Components/VideoDetail";
import "./Movie.css";

class Movie extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };
  handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });

    this.setState({
      videos: response.data.items,
    });
    console.log("this is resp", response);
  };
  handleVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    var divStyle = {
      marginTop: "1em",
      color: "black",
    };
    return (
      <>
        <NavBar2 />
        <div className="Body" id="Movie">
          <div className="wrapper">
            <div className="FeedBack">
              <h1 className="Mhead" id="Mhead">
                FeedBack Form
              </h1>
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

                <button className="btn" id="bbtn">
                  Submit
                </button>
              </form>
            </div>
            <div className="Other">
              <div className="Logo">
                <SearchBar handleFormSubmit={this.handleSubmit} />
              </div>
              <div className="Details">
                <VideoDetail video={this.state.selectedVideo} />
              </div>
            </div>
          </div>
          <div className="vdoLst">
            <VideoList
              handleVideoSelect={this.handleVideoSelect}
              videos={this.state.videos}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Movie;
