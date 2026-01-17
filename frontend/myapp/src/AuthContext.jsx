// src/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const login = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData || null);
    localStorage.setItem("token", tokenValue);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("signedUp", "true"); // compatibility with old flow
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("signedUp");
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
