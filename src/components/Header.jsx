import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ isMorning }) {
  const location = useLocation();
  const current = location.pathname;

  const navItem = (path, label) => (
    <Link
      to={path}
      style={{
        padding: "0.3rem 0.6rem",
        textDecoration: "none",
        color: isMorning ? "#2f2f2f" : "#fff",
        opacity: current === path ? 1 : 0.6,
        borderBottom: current === path
          ? `1px solid ${isMorning ? "#2f2f2f" : "#fff"}`
          : "none",
        transition: "0.3s ease",
        letterSpacing: "0.12em",
        fontSize: "0.9rem",
      }}
    >
      {label}
    </Link>
  );

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "64px",           // ← ★固定高さ（かぶり防止）
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        background: isMorning
          ? "rgba(255,255,255,0.7)"
          : "rgba(0,0,0,0.4)",

        backdropFilter: "blur(8px)",
        zIndex: 100,
        fontFamily: "Shippori Mincho B1, serif",

        padding: "0",             // ← ★高さが暴れない
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: "1.2rem",
          alignItems: "center",
        }}
      >
        {navItem("/", "Home")}
        {navItem("/boutique", "Boutique")}
        {navItem("/gift", "Gift")}
        {navItem("/story", "Story")}
        {navItem("/contact", "Contact")}
      </nav>
    </header>
  );
}
