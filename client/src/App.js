import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    </Router>
  );
}

export default App;
