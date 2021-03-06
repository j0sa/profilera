import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Info from "./pages/Info";
import Privacy from "./pages/Privacy";
import Splash from "./pages/Splash";
import ErrorPage from "./pages/ErrorPage";
import Analysis from "./pages/Analysis";
import Terms from "./pages/Terms";
import styled from "styled-components";
import { HashLink } from "react-router-hash-link";

function App() {
  const StyledLink = styled(Link)`
    color: #e7dfdd;
    text-decoration: none;
    box-shadow: inset 0 -1px 0 #a239ca;
    border: none;
    background-repeat: no-repeat;
    background-color: transparent;
    font-weight: 500;
    font-size: 0.9375rem;
    letter-spacing: 0.02857em;
  `;

  const StyledLinkHashLink = styled(HashLink)`
    color: #e7dfdd;
    text-decoration: none;
    box-shadow: inset 0 -1px 0 #a239ca;
    border: none;
    background-repeat: no-repeat;
    background-color: transparent;
    font-weight: 500;
    font-size: 0.9375rem;
    letter-spacing: 0.02857em;
  `;

  return (
    <Router>
      <Routes>
        <Route index element={<Info />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="splash" element={<Splash />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <footer className="footer">
        <span id="profilera-trademark">
          © 2022 Profilera Limited. All rights reserved.
        </span>
        <ul>
          <li>
            <StyledLink
              to={{
                pathname: "/splash",
              }}
            >
              Manifesto
            </StyledLink>
          </li>
          <li>
            <StyledLinkHashLink to="/splash#meet-the-team-div">
              Team
            </StyledLinkHashLink>
          </li>
          <li>
            <StyledLink
              to={{
                pathname: "/",
              }}
            >
              Info
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to={{
                pathname: "/privacy",
              }}
            >
              Privacy
            </StyledLink>
          </li>
          <li>
            <StyledLink
              to={{
                pathname: "/terms",
              }}
            >
              Terms
            </StyledLink>
          </li>
        </ul>
      </footer>
    </Router>
  );
}

export default App;
