import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function Navbar({ isMorning, handleToggle }) {
  const [activeSection, setActiveSection] = useState("top");
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ← ★ 追加

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

  // 閉じながらスクロール
  const handleNavClick = (e, id) => {
    e.preventDefault();

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }

    setMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    const top = document.getElementById("top");
    if (top) {
      top.scrollIntoView({ behavior: "smooth" });
      setActiveSection("top");
    }
    setMenuOpen(false);
  };

  // isMorning による ID 切替
  const storeId = isMorning ? "store" : "store-night";

  return (
    <>
      {/* ============================ */}
      {/*            NAVBAR            */}
      {/* ============================ */}
      <header
        className={`navbar ${isMorning ? "day" : "night"} ${
          visible ? "visible" : ""
        }`}
      >
        <div className="navbar-inner">

          {/* 左ロゴ */}
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

          {/* PCナビ */}
          <nav className="navbar-center">
            <a
              onClick={(e) => handleNavClick(e, "top")}
              className={activeSection === "top" ? "active" : ""}
            >
              Top
            </a>

            <a
              onClick={(e) => handleNavClick(e, storeId)}
              className={activeSection === storeId ? "active" : ""}
            >
              Store
            </a>

            <a
              onClick={(e) => handleNavClick(e, "exhibit")}
              className={activeSection === "exhibit" ? "active" : ""}
            >
              Exhibit
            </a>

            <a
              onClick={(e) => handleNavClick(e, "story")}
              className={activeSection === "story" ? "active" : ""}
            >
              Story
            </a>
          </nav>

          {/* 右：朝夜トグル & ハンバーガー */}
          <div className="navbar-right">
            <span className="toggle-label" onClick={handleToggle}>
              {isMorning ? "Night — 琥珀の香" : "Morning — 白露の香"}
            </span>

            {/* 🔥 ハンバーガー */}
            <button
              className={`hamburger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================ */}
      {/*        MOBILE MENU           */}
      {/* ============================ */}

      <div
        className={`mobile-menu ${isMorning ? "" : "night"} ${
          menuOpen ? "active" : ""
        }`}
      >
        <nav>
          <a onClick={(e) => handleNavClick(e, "top")}>Top</a>
          <a onClick={(e) => handleNavClick(e, storeId)}>Store</a>
          <a onClick={(e) => handleNavClick(e, "exhibit")}>Exhibit</a>
          <a onClick={(e) => handleNavClick(e, "story")}>Story</a>
        </nav>
      </div>
    </>
  );
}
