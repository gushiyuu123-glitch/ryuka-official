import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function NavbarGlobal({ isMorning }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Top("/") は非表示
  if (location.pathname === "/") return null;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`navbar ${isMorning ? "day" : "night"} visible`}>
        <div className="navbar-inner">

          {/* 左ロゴ */}
          <Link to="/" className="navbar-left logo-link" onClick={() => setMenuOpen(false)}>
            <img src="/image/ryuka_logo.png" alt="Ryuka" className="navbar-logo" />
            <span className="brand-name">Ryuka Fragrance</span>
          </Link>

          {/* PC メニュー */}
          <nav className="navbar-center pc-nav">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Top</Link>
            <Link to="/stores" className={`nav-link ${isActive("/stores") ? "active" : ""}`}>Store</Link>
            <Link to="/exhibit" className={`nav-link ${isActive("/exhibit") ? "active" : ""}`}>Exhibit</Link>
            <Link to="/story" className={`nav-link ${isActive("/story") ? "active" : ""}`}>Story</Link>
            <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>Contact</Link>
            <Link to="/diagnosis" className={`nav-link ${isActive("/diagnosis") ? "active" : ""}`}>Diagnosis</Link>
          </nav>

          {/* ハンバーガー */}
          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>

        </div>
      </header>

      {/* モバイルメニュー */}
      <div className={`mobile-menu ${isMorning ? "" : "night"} ${menuOpen ? "active" : ""}`}>
        <nav>
          <Link to="/" onClick={() => setMenuOpen(false)}>Top</Link>
          <Link to="/stores" onClick={() => setMenuOpen(false)}>Store</Link>
          <Link to="/exhibit" onClick={() => setMenuOpen(false)}>Exhibit</Link>
          <Link to="/story" onClick={() => setMenuOpen(false)}>Story</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/diagnosis" onClick={() => setMenuOpen(false)}>Diagnosis</Link>
        </nav>
      </div>
    </>
  );
}
