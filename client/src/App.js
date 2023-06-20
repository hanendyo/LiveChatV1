import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LiveChat from "./pages/LiveChat";
// import LiveChat from "./pages/LiveChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/room/:id" element={<LiveChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
