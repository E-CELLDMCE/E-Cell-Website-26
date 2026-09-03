import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MeetOurTeam from "./pages/MeetOurTeam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<MeetOurTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;