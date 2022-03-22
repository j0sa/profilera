import React from "react";
import "./css/Info.scss";
import VideoBg from "reactjs-videobg";
import mp4 from "../assets/videos/video.mp4";

const Info = () => {
  return (
    <div>
      <VideoBg>
        <VideoBg.Source src={mp4} type="video/mp4" />
      </VideoBg>
      <h1>WTF</h1>
    </div>
  );
};

export default Info;
