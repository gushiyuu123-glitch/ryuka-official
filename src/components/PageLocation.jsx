// ===============================
// 🌕 PageLocation.jsx — 琉香共通 現在地バー（Light Bloom Ver.）
// ===============================
import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { gsap } from "gsap";

export default function PageLocation({ isMorning }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const bloomRef = useRef(null);

  // 🪶 スクロール監視
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/") return null;

  // 💠 ページマッピング
  const map = [
    { key: "/stores", label: "STORE" },
    { key: "/workshop", label: "WORKSHOP" },
    { key: "/gift", label: "GIFT" },
    { key: "/boutique", label: "BOUTIQUE" },
    { key: "/contact", label: "CONTACT" },
  ];
  const current = map.find((item) => pathname.startsWith(item.key))?.label;
  if (!current) return null;

  // 🌅 / 🌙 トグル
  const handleToggle = (e) => {
    e.preventDefault();
    triggerBloom(); // 光エフェクトを発火
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("toggleMode"));
    }, 350); // エフェクトと同期
  };

  // ✨ 光の粒（Bloom）演出
  const triggerBloom = () => {
    const container = bloomRef.current;
    if (!container) return;

    // 既存の粒をクリア
    container.innerHTML = "";

    for (let i = 0; i < 12; i++) {
      const dot = document.createElement("div");
      dot.style.position = "absolute";
      dot.style.left = "50%";
      dot.style.top = "50%";
      dot.style.width = "6px";
      dot.style.height = "6px";
      dot.style.borderRadius = "50%";
      dot.style.background = isMorning
        ? "rgba(255, 220, 150, 0.8)"
        : "rgba(180, 240, 255, 0.9)";
      dot.style.pointerEvents = "none";
      container.appendChild(dot);

      const angle = (Math.PI * 2 * i) / 12;
      const radius = 40 + Math.random() * 40;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * (Math.random() > 0.5 ? 1 : 0.6);

      gsap.fromTo(
        dot,
        { x: 0, y: 0, scale: 0, opacity: 1 },
        {
          x,
          y,
          scale: 1.4,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => dot.remove(),
        }
      );
    }
  };

  return (
    <div
      className="page-location"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: scrolled ? "0.6rem 10%" : "1rem 12%",
        fontFamily: '"Poppins", "Shippori Mincho B1", sans-serif',
        letterSpacing: "0.07em",
        fontSize: "0.9rem",
        backdropFilter: scrolled
          ? "blur(14px) saturate(180%)"
          : "blur(8px) saturate(140%)",
        borderBottom: isMorning
          ? "1px solid rgba(0,0,0,0.04)"
          : "1px solid rgba(255,255,255,0.12)",
        background: isMorning
          ? scrolled
            ? "rgba(255,255,255,0.9)"
            : "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(248,244,238,0.5))"
          : scrolled
          ? "rgba(25,22,20,0.9)"
          : "linear-gradient(90deg, rgba(20,17,15,0.8), rgba(35,28,23,0.75))",
        boxShadow: scrolled
          ? isMorning
            ? "0 2px 10px rgba(180,200,190,0.25)"
            : "0 2px 12px rgba(0,0,0,0.6)"
          : "none",
        transition: "all 0.6s ease",
      }}
    >
      {/* 🌿 ロゴ */}
      <Link
        to="/"
        style={{
          color: isMorning ? "#2f2f2f" : "#f6f0e6",
          fontFamily: "Shippori Mincho B1, serif",
          textDecoration: "none",
          fontSize: "0.95rem",
          fontWeight: 400,
          letterSpacing: "0.12em",
            lineHeight: "1",       // ← 🟡行間を詰めてボタンの高さを下げる！
    padding: "1rem 1.5rem",   // ← 🟡クリック範囲を小さくする（縦余白削減）
          opacity: scrolled ? 0.9 : 1,
          transition: "opacity 0.4s ease, color 0.4s ease, transform 0.4s ease",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = 1)}
        onMouseLeave={(e) => (e.target.style.opacity = 0.9)}
      >
        琉香<span style={{ fontSize: "0.75rem", opacity: 0.6 }}> RYUKA</span>
      </Link>

      {/* 区切り線 */}
      <span
        style={{
          margin: "0 0.6rem",
          opacity: 0.7,
          color: isMorning ? "#666" : "#d8c9a0",
        }}
      >
        ／
      </span>

      {/* 現在地 */}
      <span
        style={{
          color: isMorning ? "#6daea0" : "#e8b37e",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textShadow: isMorning
            ? "0 1px 2px rgba(255,255,255,0.9)"
            : "0 1px 3px rgba(0,0,0,0.7)",
          filter: isMorning
            ? "drop-shadow(0 1px 2px rgba(180,220,210,0.25))"
            : "drop-shadow(0 1px 2px rgba(255,210,160,0.2))",
          transition: "color 0.5s ease, filter 0.5s ease",
        }}
      >
        {current}
      </span>

      {/* 🌙 / 🌅 トグルスイッチ */}
      <div
        onClick={handleToggle}
        style={{
          position: "relative",
          overflow: "visible",
          marginLeft: "auto",
          padding: "0.6rem 2.4rem",
          borderRadius: "999px",
          fontSize: "0.85rem",
          cursor: "pointer",
          userSelect: "none",
          background: isMorning
            ? "rgba(255,255,255,0.45)"
            : "rgba(255,255,255,0.1)",
          color: isMorning ? "#4a4a4a" : "#f3e8cf",
          border: isMorning
            ? "1px solid rgba(180,180,180,0.25)"
            : "1px solid rgba(255,255,255,0.15)",
          boxShadow: isMorning
            ? "0 2px 5px rgba(150,170,160,0.2)"
            : "0 2px 5px rgba(0,0,0,0.5)",
          backdropFilter: "blur(6px)",
          transition: "all 0.4s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = isMorning
            ? "rgba(255,255,255,0.7)"
            : "rgba(255,255,255,0.18)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = isMorning
            ? "rgba(255,255,255,0.55)"
            : "rgba(255,255,255,0.1)")
        }
      >
        {isMorning ? "Night" : "Morning"}
        {/* 光粒コンテナ */}
        <div
          ref={bloomRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "visible",
          }}
        />
      </div>
    </div>
  );
}
