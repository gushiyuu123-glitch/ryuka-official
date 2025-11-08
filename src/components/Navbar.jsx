import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Navbar({ isMorning, handleToggle }) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  // 🌫️ スクロールでフェードイン & 現在セクション検知
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 60);
      const sections = ["top", "store", "exhibit", "story"];
      let current = "top";

      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const middle = window.innerHeight * 0.4;
          if (rect.top <= middle && rect.bottom >= middle) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🌬️ スクロールに応じた光量変化
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const max = 600;
      const glow = Math.min(scrollY / max, 1);
      document.documentElement.style.setProperty("--navGlow", glow.toFixed(2));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✨ ページ内スムーススクロール
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // 🌿 ロゴクリックでTopへ戻る（確実に反応）
  const handleLogoClick = (e) => {
    e.preventDefault();
    const top = document.getElementById("top");
    if (top) {
      top.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection("top");
    }
  };

  return (
    <header
      className={`navbar ${isMorning ? "day" : "night"} ${
        visible ? "visible" : ""
      }`}
    >
      <div className="navbar-inner">
        {/* 🌿 左ロゴ（クリックでTopへ戻る） */}
        <button
          className="navbar-left"
          onClick={handleLogoClick}
          style={{
            all: "unset",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img
            src="/image/ryuka_logo.png"
            alt="Ryuka Logo"
            className="navbar-logo"
          />
          <span className="brand-name">Ryuka Fragrance</span>
        </button>

        {/* ✴️ 中央メニュー */}
        <nav className="navbar-center">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "top")}
            className={`nav-link ${activeSection === "top" ? "active" : ""}`}
          >
            Top
          </a>
          <a
            href="#store"
            onClick={(e) => handleNavClick(e, "store")}
            className={`nav-link ${activeSection === "store" ? "active" : ""}`}
          >
            Store
          </a>
          <a
            href="#exhibit"
            onClick={(e) => handleNavClick(e, "exhibit")}
            className={`nav-link ${
              activeSection === "exhibit" ? "active" : ""
            }`}
          >
            Exhibit
          </a>
          <a
            href="#story"
            onClick={(e) => handleNavClick(e, "story")}
            className={`nav-link ${activeSection === "story" ? "active" : ""}`}
          >
            Story
          </a>
        </nav>

        {/* ☀️🌙 トグル */}
        <div className="navbar-right">
          <span className="toggle-label" onClick={handleToggle}>
            {isMorning ? "Night — 琥珀の香" : "Morning — 白露の香"}
          </span>
        </div>
      </div>
    </header>
  );
}
