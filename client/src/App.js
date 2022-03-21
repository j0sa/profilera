import "./App.css";
//import logo from "./profileralogo.png";
import React, { Component } from "react";
//import styled, { keyframes } from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Info";
import Privacy from "./Pages/Privacy";
import Splash from "./Pages/Splash";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
