import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-conta" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/explorar" element={<Explore />} />
        <Route path="/home/historico" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;