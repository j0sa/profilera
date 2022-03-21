import "./App.css";
//import logo from "./profileralogo.png";
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {
//   bounce,
//   bouceIn,
//   bouceOut,
//   bounceInDown,
//   bounceInLeft,
//   bounceInRight,
//   bounceInUp,
//   bounceOutDown,
//   bounceOutLeft,
//   bounceOutRight,
//   bounceOutUp,
//   fadeIn,
//   fadeInDown,
//   fadeInDownBig,
//   fadeInLeft,
//   fadeInLeftBig,
//   fadeInRight,
//   fadeInRightBig,
//   fadeInUp,
//   fadeInUpBig,
//   fadeOut,
//   fadeOutDown,
//   fadeOutDownBig,
//   fadeOutLeft,
//   fadeOutLeftBig,
//   fadeOutRight,
//   fadeOutRightBig,
//   fadeOutUp,
//   fadeOutUpBig,
//   flash,
//   flip,
//   flipInX,
//   flipInY,
//   flipOutX,
//   flipOutY,
//   headShake,
//   hinge,
//   jello,
//   lightSpeedIn,
//   lightSpeedOut,
//   pulse,
//   rollIn,
//   rollOut,
//   rotateIn,
//   rotateInDownLeft,
//   rotateInDownRight,
//   rotateInUpLeft,
//   rotateInUpRight,
//   rotateOut,
//   rotateOutDownLeft,
//   rotateOutDownRight,
//   rotateOutUpLeft,
//   rotateOutUpRight,
//   rubberBand,
//   shake,
//   slideInDown,
//   slideInLeft,
//   slideInRight,
//   slideInUp,
//   slideOutDown,
//   slideOutLeft,
//   slideOutRight,
//   slideOutUp,
//   swing,
//   tada,
//   wobble,
//   zoomIn,
//   zoomInDown,
//   zoomInLeft,
//   zoomInRight,
//   zoomInUp,
//   zoomOut,
//   zoomOutDown,
//   zoomOutLeft,
//   zoomOutRight,
//   zoomOutUp,
// } from "react-animations";
import Home from "./Pages/Home";
import Privacy from "./Pages/Privacy";
import Splash from "./Pages/Splash";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
