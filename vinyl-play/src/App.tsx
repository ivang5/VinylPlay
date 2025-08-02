import "./App.css";
import Callback from "./pages/Callback";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  </BrowserRouter>
);
