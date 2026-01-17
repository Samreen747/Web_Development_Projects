import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Story from "./pages/Story";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1.5rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<Story />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </main>
    </>
  );
}
