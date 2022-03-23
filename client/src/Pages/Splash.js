import React from "react";
import "./css/Splash.scss";
import VideoBg from "reactjs-videobg";
import mp4 from "../assets/videos/backgroundAnimation.mp4";

const Splash = () => {
  return( <div>
  <VideoBg>
    <VideoBg.Source src={mp4} type="video/mp4" />
  </VideoBg>
  <h1>Patterns that elevate your business success.
</h1>
<h2> Make use of profilera’s sophisticated AI-assisted pattern revealing service and gain new knowledge and insights about your customer base. </h2>
</div>);
};

export default Splash;
