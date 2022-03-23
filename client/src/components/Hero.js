import React from "react";
import VideoBg from "reactjs-videobg";
import mp4 from "../assets/videos/backgroundAnimation.mp4";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <VideoBg>
        <VideoBg.Source
          src={mp4}
          type="video/mp4"
          alt="Machine learning Algorithm"
        />
      </VideoBg>
      <h1 className="hero_title">
        Patterns that elevate your business success.
      </h1>
      <h2 className="hero_subscript">
        Make use of Profilera's sophisticated AI-assisted pattern revealing
        service and gain new knowledge and insights about your customer base.
      </h2>
    </div>
  );
};

export default Hero;
