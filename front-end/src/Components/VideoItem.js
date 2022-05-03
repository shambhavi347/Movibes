import React from "react";
import "../Components/video.css";

const VideoItem = ({ video, handleVideoSelect }) => {
  return (
    <div onClick={() => handleVideoSelect(video)} className=" video-item item">
      <img
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />
      <div className="content">
        <div className="header " style={{ color: "black", marginLeft: "5px" }}>
          {video.snippet.title}
        </div>
      </div>
    </div>
  );
};
export default VideoItem;
