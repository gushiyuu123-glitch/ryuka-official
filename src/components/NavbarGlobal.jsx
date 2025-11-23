import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function NavbarGlobal({ isMorning }) {
  const location = useLocation();

  // ⭐ Topページ("/") では表示しない（透明レイヤー問題の根源）
  if (location.pathname === "/") return null;

  return (
    <header className={`navbar-global ${isMorning ? "day" : "night"}`}>
      <div className="navbar-inner">
        
        {/* 🌿 左ロゴ */}
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img
              src="/image/ryuka_logo.png"
              alt="Ryuka Logo"
              className="navbar-logo"
            />
            <span className="brand-name">Ryuka Fragrance</span>
          </Link>
        </div>

        {/* ✴️ 中央メニュー */}
        <nav className="navbar-center">
          <Link to="/" className="nav-link">Top</Link>
          <Link to="/stores" className="nav-link">Store</Link>
          <Link to="/exhibit" className="nav-link">Exhibit</Link>
          <Link to="/story" className="nav-link">Story</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/diagnosis" className="nav-link">Diagnosis</Link>
        </nav>

      </div>
    </header>
  );
}
