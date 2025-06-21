import "./App.css";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  </BrowserRouter>
);
