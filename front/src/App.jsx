import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Home";
import Explore from "./pages/Explore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-conta" element={<Register />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/home/explorar" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;