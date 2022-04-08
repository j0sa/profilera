import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import Info from "./pages/Info";
import Privacy from "./pages/Privacy";
import Splash from "./pages/Splash";
import ErrorPage from "./pages/ErrorPage";
import Analysis from "./pages/Analysis";
import Terms from "./pages/Terms";

function App() {
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
            <button className="footer-button">Manifesto</button>
          </li>
          <li>
            <button className="footer-button">Team</button>
          </li>
          <li>
            <button className="footer-button">Info</button>
          </li>
          <li>
            <button className="footer-button">Privacy</button>
          </li>
          <li>
            <button className="footer-button">Terms</button>
          </li>
        </ul>
      </footer>
    </Router>
  );
}

export default App;
