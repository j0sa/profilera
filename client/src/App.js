import "./App.css";
import logo from "./profileralogo.png";
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { bounce,
  bouceIn,
  bouceOut,
  bounceInDown,
  bounceInLeft,
  bounceInRight,
  bounceInUp,
  bounceOutDown,
  bounceOutLeft,
  bounceOutRight,
  bounceOutUp,
  fadeIn,
  fadeInDown,
  fadeInDownBig,
  fadeInLeft,
  fadeInLeftBig,
  fadeInRight,
  fadeInRightBig,
  fadeInUp,
  fadeInUpBig,
  fadeOut,
  fadeOutDown,
  fadeOutDownBig,
  fadeOutLeft,
  fadeOutLeftBig,
  fadeOutRight,
  fadeOutRightBig,
  fadeOutUp,
  fadeOutUpBig,
  flash,
  flip,
  flipInX,
  flipInY,
  flipOutX,
  flipOutY,
  headShake,
  hinge,
  jello,
  lightSpeedIn,
  lightSpeedOut,
  pulse,
  rollIn,
  rollOut,
  rotateIn,
  rotateInDownLeft,
  rotateInDownRight,
  rotateInUpLeft,
  rotateInUpRight,
  rotateOut,
  rotateOutDownLeft,
  rotateOutDownRight,
  rotateOutUpLeft,
  rotateOutUpRight,
  rubberBand,
  shake,
  slideInDown,
  slideInLeft,
  slideInRight,
  slideInUp,
  slideOutDown,
  slideOutLeft,
  slideOutRight,
  slideOutUp,
  swing,
  tada,
  wobble,
  zoomIn,
  zoomInDown,
  zoomInLeft,
  zoomInRight,
  zoomInUp,
  zoomOut,
  zoomOutDown,
  zoomOutLeft,
  zoomOutRight,
  zoomOutUp, } from "react-animations";

const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite;`;

  const FadeInUp = styled.div`animation: 2s ${keyframes`${fadeInUp}`} `;
  const FadeInLeft = styled.div`animation: 2s ${keyframes`${fadeInLeft}`} `;
// function App() {
//   return (
//     <div>
//       <header>
//       <img src={logo} />
//       </header>
//     </div>
//   );
// }

// export default App;

class ReactAnimations extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <p className="logo">This is the place for the logo</p>
        </header>
        <p className="welcometxt">
          {" "}
          <FadeInUp>
            <h1> Welcome to profilera! </h1>
          </FadeInUp>{" "}
        </p>
        <div className="startinfotxt">
              <FadeInLeft><hr></hr></FadeInLeft>
              <FadeInLeft>Gain valuble insight regarding your customers with profilera.</FadeInLeft>
        </div>

        <div className="startinfotxt2">
              <FadeInLeft><hr></hr></FadeInLeft>
              <FadeInLeft>Enlightement is but a click away.</FadeInLeft>
        </div>
        <div className="btndiv">
              
              <button className="joinbtn">Join</button>
        </div>
      </div>
    );
  }
}

export default ReactAnimations;
