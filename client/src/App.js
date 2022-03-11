import "./App.css";
import logo from "./profileralogo.png";
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { bounce } from "react-animations";

const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite;
`;

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
        <header>
          <img src={logo} alt="profilera logo " />
        </header>
        <p className="welcometxt">
          {" "}
          <Bounce>
            <h1> Welcome to profilera! </h1>
          </Bounce>{" "}
        </p>
      </div>
    );
  }
}

export default ReactAnimations;
