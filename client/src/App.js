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
            <form>
              <button
                formaction="http://localhost:3000/splash/"
                className="footer-button"
              >
                Manifesto
              </button>
            </form>
          </li>
          <li>
            <from>
              <button
                formaction="http://localhost:3000/splash/"
                className="footer-button"
              >
                Team
              </button>
            </from>
          </li>
          <li>
            <form>
              <button
                formaction="http://localhost:3000/"
                className="footer-button"
              >
                Info
              </button>
            </form>
          </li>
          <li>
            <form>
              <button
                formaction="http://localhost:3000/privacy/"
                className="footer-button"
              >
                Privacy
              </button>
            </form>
          </li>
          <li>
            <form>
              <button
                formaction="http://localhost:3000/terms/"
                className="footer-button"
              >
                Terms
              </button>
            </form>
          </li>
        </ul>
      </footer>
    </Router>
  );
}

export default App;
