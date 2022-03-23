import React from "react";
import "./css/Splash.scss";
import Hero from "../components/Hero";
import Team from "../components/Team";
import Call from "../components/Call";
import UseCase from "../components/UseCase";
import test from "../assets/images/test.jpg";

const Splash = () => {
  return (
    <div className="App">
      <Hero></Hero>
      <UseCase imageSrc={test} />
      <Team></Team>
      <Call></Call>
    </div>
  );
};

export default Splash;
