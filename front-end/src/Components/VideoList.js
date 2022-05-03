import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, handleVideoSelect }) => {
  const renderedVideos = videos.map((video) => {
    return (
      <>
        <div className="vdoItm" style={{ margin: "20px 0px" }}>
          <VideoItem
            key={video.id.videoId}
            video={video}
            handleVideoSelect={handleVideoSelect}
          />
        </div>
      </>
    );
    // console.log(video.id);
  });

  return <div className="ui relaxed divided list">{renderedVideos}</div>;
};
export default VideoList;
