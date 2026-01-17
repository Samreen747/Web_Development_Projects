import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";
import "../styles/login.css";
//addPendingItemIfAny:
/*if user clicks add to cart while logged out:
->that item is stored in local storage
->after login its added to cart*/

async function addPendingItemIfAny() {
  const raw = localStorage.getItem("pendingCartItem");
  if (!raw) return;
  try {
    const item = JSON.parse(raw);
    await api.post("/api/cart/add", item);
  } catch (e) {
    console.error("Failed to add pending item", e);
  } finally {
    localStorage.removeItem("pendingCartItem");
  }
}
//signup/login:
/*user enters their name,email,password
if success->save token->redirect to menu
if user exists:
logs them in automatically, adds the pending cart item and redirects*/

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill all fields!");
      return;
    }

    try {
      const res = await api.post("/api/auth/register", { name, email, password });
      const data = res.data;
      if (data.token) {
        login(data.token, data.user);
        await addPendingItemIfAny();
        alert("Signup successful!");
        navigate(location.state?.from || "/menu");
        return;
      }
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.msg || err.response?.data?.message;
      if (status === 409 || msg === "User already exists") {
        try {
          const loginRes = await api.post("/api/auth/login", { email, password });
          const loginData = loginRes.data;
          if (loginData.token) {
            login(loginData.token, loginData.user);
            await addPendingItemIfAny();
            alert("Welcome back!");
            navigate(location.state?.from || "/menu");
            return;
          }
        } catch (loginErr) {
          setError(loginErr.response?.data?.msg || "Login failed");
        }
      } else {
        setError(msg || "Signup failed. Try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="primary-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}
