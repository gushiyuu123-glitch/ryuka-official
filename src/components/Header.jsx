import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ isMorning }) {
  const location = useLocation();
  const current = location.pathname;

  const linkStyle = {
    margin: "0 1rem",
    textDecoration: "none",
    color: isMorning ? "#2f2f2f" : "#fff",
    opacity: 0.7,
    transition: "opacity 0.3s ease",
    fontSize: "0.9rem",
    letterSpacing: "0.15em",
  };

  const activeStyle = {
    opacity: 1,
    borderBottom: `1px solid ${isMorning ? "#2f2f2f" : "#fff"}`,
    paddingBottom: "2px",
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "1rem 0",
        textAlign: "center",
        background:
          current === "/"
            ? isMorning
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(255, 255, 255, 0.1)"
            : isMorning
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
        zIndex: 100,
        color: isMorning ? "#2f2f2f" : "#fff",
        fontFamily: "Shippori Mincho B1, serif",
        transition: "background 0.6s ease, color 0.6s ease",
      }}
    >
      <h1
        style={{
          fontSize: "1rem",
          fontWeight: "400",
          letterSpacing: "0.2em",
          marginBottom: "0.4rem",
        }}
      >
        琉香 — RYUKA
      </h1>

      <nav>
        <Link to="/" style={current === "/" ? { ...linkStyle, ...activeStyle } : linkStyle}>
          Home
        </Link>
        <Link to="/boutique" style={current === "/boutique" ? { ...linkStyle, ...activeStyle } : linkStyle}>
          Boutique
        </Link>
        <Link to="/gift" style={current === "/gift" ? { ...linkStyle, ...activeStyle } : linkStyle}>
          Gift
        </Link>
        <Link to="/story" style={current === "/story" ? { ...linkStyle, ...activeStyle } : linkStyle}>
          Story
        </Link>
        <Link to="/contact" style={current === "/contact" ? { ...linkStyle, ...activeStyle } : linkStyle}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
