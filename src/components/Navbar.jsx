import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import MobileMenu from "./MobileMenu";

export default function Navbar({ isMorning, handleToggle }) {
  const [activeSection, setActiveSection] = useState("top");
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ← ハンバーガー状態

  // 🌫️ スクロール光エフェクト + ナビ表示制御
  useEffect(() => {
    const handleScroll = () => {
      const topSection = document.getElementById("top");

      if (topSection) {
        const rect = topSection.getBoundingClientRect();
        setVisible(rect.top < 0);
      }

      const scrollY = window.scrollY;
      const glow = Math.min(scrollY / 600, 1);
      document.documentElement.style.setProperty("--navGlow", glow.toFixed(2));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🟧 朝/夜で Store の ID 切り替え
  const storeId = isMorning ? "store" : "store-night";

  // ✨スムーススクロール
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setMenuOpen(false); // ← モバイルなら閉じる
    }
  };

  // 🔙 ロゴクリック
  const handleLogoClick = (e) => {
    e.preventDefault();
    const top = document.getElementById("top");
    if (top) {
      top.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection("top");
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`navbar ${isMorning ? "day" : "night"} ${
          visible ? "visible" : ""
        }`}
      >
        <div className="navbar-inner">
          {/* 🌟 ロゴ */}
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

          {/* 🌟 PC用ナビ */}
          <nav className="navbar-center pc-nav">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, "top")}
              className={activeSection === "top" ? "active" : ""}
            >
              Top
            </a>

            <a
              href={`#${storeId}`}
              onClick={(e) => handleNavClick(e, storeId)}
              className={activeSection === storeId ? "active" : ""}
            >
              Store
            </a>

            <a
              href="#exhibit"
              onClick={(e) => handleNavClick(e, "exhibit")}
              className={activeSection === "exhibit" ? "active" : ""}
            >
              Exhibit
            </a>

            <a
              href="#story"
              onClick={(e) => handleNavClick(e, "story")}
              className={activeSection === "story" ? "active" : ""}
            >
              Story
            </a>
          </nav>

          {/* 🌟 トグル＋ハンバーガー（スマホ） */}
          <div className="navbar-right toggle-area">
            <span className="toggle-label" onClick={handleToggle}>
              {isMorning ? "Night — 琥珀の香" : "Morning — 白露の香"}
            </span>

            {/* 🍔 ハンバーガー（スマホ専用） */}
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* 🌫️ モバイルメニュー */}
      <MobileMenu
        open={menuOpen}
        setOpen={setMenuOpen}
        handleNavClick={handleNavClick}
        isMorning={isMorning}
      />
    </>
  );
}
