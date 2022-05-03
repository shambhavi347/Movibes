import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <div>
        <h1
          style={{
            color: "black",
            marginLeft: "100px",
            width: "500px",
          }}
        >
          Enter any video you want to watch!!
        </h1>
        <br></br>
        <p
          style={{
            fontSize: "25px",
            color: "black",
            width: "500px",
            height: "250px",
            marginLeft: "100px",
            marginRight: "20px",
          }}
        >
          Choose the genres you think this video belongs to!!! Remember that our
          Suggestion List works on the feedback that you give. Do not shy away
          fill it to get better recommendation of friends!!
        </p>
      </div>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(typeof video);
  return (
    <div>
      <div className="ui embed">
        <iframe
          src={videoSrc}
          allowFullScreen
          title="Video player"
          style={{
            marginLeft: "100px",
            // marginRight: "200px",
            height: "300px",
            width: "500px",
          }}
        />
      </div>
      {/* <div className="ui segment">
        <h4 className="ui header" style={{ color: "black" }}>
          {video.snippet.title}
        </h4>
        <p>{video.snippet.description}</p>
      </div> */}
    </div>
  );
};

export default VideoDetail;
