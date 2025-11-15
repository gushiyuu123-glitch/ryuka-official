import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Navbar({ isMorning, handleToggle }) {
  const [activeSection, setActiveSection] = useState("top");
  const [visible, setVisible] = useState(false); // ← トップで非表示にする

  // 🌫️ スクロール光エフェクト（navGlow）
useEffect(() => {
  const handleScroll = () => {
    const topSection = document.getElementById("top");

    if (topSection) {
      const rect = topSection.getBoundingClientRect();

      // rect.top はズレがないので確実に判定できる
      setVisible(rect.top < 0); // ← 80px 上に行ったら Navbar を表示
    }

    // navGlow（追加）
    const scrollY = window.scrollY;
    const glow = Math.min(scrollY / 600, 1);
    document.documentElement.style.setProperty("--navGlow", glow.toFixed(2));
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  // 🟧 朝/夜でStoreのIDを切り替え
  const storeId = isMorning ? "store" : "store-night";

  // ✨ スムーススクロール
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // 🔙 ロゴクリック
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
        {/* ロゴ */}
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

        {/* メニュー */}
        <nav className="navbar-center">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "top")}
            className={`nav-link ${activeSection === "top" ? "active" : ""}`}
          >
            Top
          </a>

          <a
            href={`#${storeId}`}
            onClick={(e) => handleNavClick(e, storeId)}
            className={`nav-link ${
              activeSection === storeId ? "active" : ""
            }`}
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

        {/* トグル */}
        <div className="navbar-right">
          <span className="toggle-label" onClick={handleToggle}>
            {isMorning ? "Night — 琥珀の香" : "Morning — 白露の香"}
          </span>
        </div>
      </div>
    </header>
  );
}
