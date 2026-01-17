import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
// import "../styles/global.css";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="main-header">
      <div className="logo">
        <h3>Café Aroma ☕</h3>
      </div>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
          <NavLink to="/Story">Story</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        {isAuthenticated ? (
          <button onClick={logout} className="nav-btn">Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}
