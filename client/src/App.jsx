import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OverlayProvider } from "@react-aria/overlays";
import Home from "./pages/Home";
import CollectForm from "./pages/CollectForm";
import Donate from "./pages/Donate";
import "./styles.css";

function App() {
  return (
    <Router>
      <OverlayProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collect" element={<CollectForm />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </div>
      </OverlayProvider>
    </Router>
  );
}

export default App;
