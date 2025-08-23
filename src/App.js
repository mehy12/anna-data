import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./common/Navbar";

const Placeholder = ({ name }) => <h1 className="text-2xl m-8">{name}</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Placeholder name="Home" />} />
        <Route path="/about" element={<Placeholder name="About Us" />} />
        <Route path="/login" element={<Placeholder name="Login" />} />
        <Route path="/signup" element={<Placeholder name="Signup" />} />
        <Route path="/dashboard" element={<Placeholder name="Dashboard" />} />
        <Route path="/marketplace" element={<Placeholder name="Marketplace" />} />
        <Route path="/weather" element={<Placeholder name="Weather" />} />
        <Route path="/schemes" element={<Placeholder name="Schemes" />} />
        <Route path="/profile" element={<Placeholder name="Profile" />} />
      </Routes>
    </Router>
  );
}

export default App;
