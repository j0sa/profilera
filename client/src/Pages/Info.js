import React from "react";
import "./css/Info.scss";
import video from "../assets/videos/video.mp4";

const Info = () => {
  return (
    <video autoPlay loop muted id="video">
      <source src={video} type="video/mp4"></source>
    </video>
  );
};

export default Info;
