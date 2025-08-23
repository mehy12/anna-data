import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 p-4 text-white flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/about">About Us</Link>
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/marketplace">Marketplace</Link>
    <Link to="/weather">Weather</Link>
    <Link to="/schemes">Schemes</Link>
    <Link to="/profile">Profile</Link>
  </nav>
);

export default Navbar;
