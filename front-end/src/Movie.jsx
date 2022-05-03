import React from "react";
import SearchBar from "./Components/Searchbar";
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
        <div className="Body">
          <div className="wrapper">
            <div className="Logo">
              <SearchBar handleFormSubmit={this.handleSubmit} />
            </div>
            <div className="Details">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
          </div>

          {/* <div className="SrchBar">
            <div className="Bar">SearchBar</div>
            <div className="dtls">Movie Details</div>
            <SearchBar handleFormSubmit={this.handleSubmit} />
          </div>
          <div className="vdoDtls">
            Video Details
            <VideoDetail video={this.state.selectedVideo} />
          </div> */}
          {/* <div className="ui container">
            <div className="ui grid">
              <div className="ui row">
                <div className="eleven wide column"></div> */}
          {/* <div className="five wide column"> */}
          <div className="vdoLst">
            <VideoList
              handleVideoSelect={this.handleVideoSelect}
              videos={this.state.videos}
            />
          </div>
        </div>
        {/* </div> */}
        {/* </div>
          </div>
        </div> */}
      </>
    );
  }
}

export default Movie;
